import React, { useState } from 'react';
import { generateThinkingResponse, generateVisionBoardImage } from '../services/geminiService';
import { BrainCircuit, Image as ImageIcon, Sparkles, Loader2, Send } from 'lucide-react';

export const AICounselor: React.FC = () => {
  const [prompt, setPrompt] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);

  const handleAsk = async () => {
    if (!prompt.trim()) return;
    setLoading(true);
    setResponse('');
    try {
      const result = await generateThinkingResponse(prompt);
      setResponse(result || 'No response generated.');
    } catch (e) {
      console.error(e);
      setResponse("Error: Could not connect to AI Counselor. Please check your API key.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 h-full flex flex-col">
      <div className="flex items-center gap-3 mb-4 text-academic-900">
        <div className="p-2 bg-academic-50 rounded-lg text-academic-600">
          <BrainCircuit size={24} />
        </div>
        <div>
          <h3 className="font-bold text-lg">AI Strategy Counselor</h3>
          <p className="text-xs text-slate-500">Powered by Gemini 3.0 (Thinking Mode)</p>
        </div>
      </div>

      <div className="flex-1 bg-slate-50 rounded-xl p-4 mb-4 overflow-y-auto min-h-[300px] border border-slate-200">
        {response ? (
           <div className="prose prose-sm max-w-none text-slate-700 whitespace-pre-wrap">{response}</div>
        ) : loading ? (
          <div className="flex flex-col items-center justify-center h-full text-academic-500 gap-2">
            <Loader2 className="animate-spin" size={32} />
            <span className="text-sm font-medium">Analyzing admission strategies...</span>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-full text-slate-400 gap-2">
            <Sparkles size={32} />
            <p className="text-sm text-center">Ask complex questions like:<br/>"Analyze my chances for MIT with a 3.8 GPA and national chess awards"</p>
          </div>
        )}
      </div>

      <div className="relative">
        <textarea
          className="w-full p-4 pr-12 rounded-xl border border-slate-200 focus:border-academic-500 focus:ring-1 focus:ring-academic-500 outline-none resize-none text-sm"
          rows={3}
          placeholder="Ask about your admission strategy..."
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          onKeyDown={(e) => { if(e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleAsk(); } }}
        />
        <button 
          onClick={handleAsk}
          disabled={loading || !prompt.trim()}
          className="absolute right-3 bottom-3 p-2 bg-academic-600 text-white rounded-lg disabled:opacity-50 hover:bg-academic-700 transition-colors"
        >
          <Send size={16} />
        </button>
      </div>
    </div>
  );
};

export const VisionBoardCreator: React.FC = () => {
  const [prompt, setPrompt] = useState('');
  const [size, setSize] = useState<'1K' | '2K' | '4K'>('1K');
  const [image, setImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    if (!prompt.trim()) return;
    setLoading(true);
    setImage(null);
    try {
      const url = await generateVisionBoardImage(prompt, size);
      setImage(url);
    } catch (e) {
      console.error(e);
      alert("Failed to generate image. Check API configuration.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 h-full flex flex-col">
       <div className="flex items-center gap-3 mb-4 text-academic-900">
        <div className="p-2 bg-accent-50 rounded-lg text-accent-600">
          <ImageIcon size={24} />
        </div>
        <div>
          <h3 className="font-bold text-lg">Future Vision Board</h3>
          <p className="text-xs text-slate-500">Visualize your campus life</p>
        </div>
      </div>

      <div className="flex-1 bg-slate-900 rounded-xl overflow-hidden relative mb-4 min-h-[300px] flex items-center justify-center group">
        {image ? (
          <img src={image} alt="Generated Vision" className="w-full h-full object-contain" />
        ) : loading ? (
           <div className="flex flex-col items-center justify-center text-white gap-2">
            <Loader2 className="animate-spin" size={32} />
            <span className="text-sm">Creating your vision...</span>
          </div>
        ) : (
          <div className="text-slate-500 text-center p-6">
            <p>Describe your dream university setting to generate a motivational poster.</p>
          </div>
        )}
      </div>

      <div className="space-y-4">
        <div className="flex gap-2">
          {(['1K', '2K', '4K'] as const).map((s) => (
            <button
              key={s}
              onClick={() => setSize(s)}
              className={`px-3 py-1 rounded-md text-xs font-bold border ${
                size === s 
                ? 'bg-accent-500 text-white border-accent-500' 
                : 'bg-white text-slate-500 border-slate-200 hover:border-accent-300'
              }`}
            >
              {s}
            </button>
          ))}
        </div>
        <div className="flex gap-2">
          <input 
            type="text" 
            className="flex-1 p-3 rounded-xl border border-slate-200 focus:border-accent-500 outline-none text-sm"
            placeholder="e.g. A futuristic library in Tokyo with cherry blossoms"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
          />
          <button 
            onClick={handleGenerate}
            disabled={loading || !prompt.trim()}
            className="bg-accent-500 text-white px-4 rounded-xl font-bold hover:bg-accent-600 transition-colors disabled:opacity-50"
          >
            Generate
          </button>
        </div>
      </div>
    </div>
  );
};
