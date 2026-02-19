import { NextRequest } from "next/server";
import Groq from "groq-sdk";

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

const SYSTEM_PROMPT = `Ты — uni.kz, умный помощник для казахстанских абитуриентов. Ты помогаешь с:
- Выбором университета в Казахстане (Назарбаев Университет, КазНУ, КБТУ, КИМЭП и другие)
- Выбором специальности (IT, медицина, инженерия, бизнес и т.д.)
- Подготовкой к ЕНТ (Единое национальное тестирование)
- Информацией о грантах и стипендиях
- Советами по поступлению

Отвечай на русском языке. Будь дружелюбным, кратким и полезным. Если не знаешь ответа — честно скажи об этом.
Используй информацию о казахстанских университетах: проходные баллы, специальности, города, стоимость обучения.`;

export async function POST(request: NextRequest) {
  try {
    const { messages } = await request.json();

    if (!messages || !Array.isArray(messages)) {
      return new Response(JSON.stringify({ error: "Messages required" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    const chatCompletion = await groq.chat.completions.create({
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        ...messages.slice(-20), // Keep last 20 messages for context
      ],
      model: "llama-3.3-70b-versatile",
      temperature: 0.7,
      max_tokens: 1024,
      stream: true,
    });

    const encoder = new TextEncoder();
    const stream = new ReadableStream({
      async start(controller) {
        try {
          for await (const chunk of chatCompletion) {
            const content = chunk.choices[0]?.delta?.content || "";
            if (content) {
              controller.enqueue(encoder.encode(`data: ${JSON.stringify({ content })}\n\n`));
            }
          }
          controller.enqueue(encoder.encode("data: [DONE]\n\n"));
          controller.close();
        } catch (error) {
          controller.error(error);
        }
      },
    });

    return new Response(stream, {
      headers: {
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
        Connection: "keep-alive",
      },
    });
  } catch (error) {
    console.error("Chat API error:", error);
    return new Response(
      JSON.stringify({ error: "Ошибка сервера. Попробуйте позже." }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
