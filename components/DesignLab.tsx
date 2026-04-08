import React, { useState, useRef } from 'react';
import { GoogleGenAI } from "@google/genai";
import { Sparkles, Upload, Loader2, Download, Image as ImageIcon } from 'lucide-react';

export const DesignLab: React.FC = () => {
  const [prompt, setPrompt] = useState('');
  const [image, setImage] = useState<string | null>(null);
  const [resultImage, setResultImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 4 * 1024 * 1024) {
        setError("Image size should be less than 4MB");
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
        setResultImage(null);
        setError(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleGenerate = async () => {
    if (!image || !prompt) return;
    
    setLoading(true);
    setError(null);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      
      // Extract base64 data and mime type
      const match = image.match(/^data:(.+);base64,(.+)$/);
      if (!match) throw new Error("Invalid image format");
      
      const mimeType = match[1];
      const base64Data = match[2];

      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash-image',
        contents: {
          parts: [
            {
              inlineData: {
                mimeType: mimeType,
                data: base64Data,
              },
            },
            { text: prompt },
          ],
        },
      });

      let foundImage = false;
      if (response.candidates && response.candidates[0].content.parts) {
        for (const part of response.candidates[0].content.parts) {
          if (part.inlineData) {
            const base64EncodeString = part.inlineData.data;
            const newImageUrl = `data:image/png;base64,${base64EncodeString}`;
            setResultImage(newImageUrl);
            foundImage = true;
            break;
          }
        }
      }
      
      if (!foundImage) {
        throw new Error("No image generated in response");
      }

    } catch (err: any) {
      console.error(err);
      setError(err.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="w-full py-20 bg-wood-100 border-t border-wood-200">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col items-center text-center mb-12">
           <div className="inline-flex items-center justify-center p-3 bg-wood-200 rounded-full mb-4">
              <Sparkles className="w-6 h-6 text-wood-900" />
           </div>
           <h2 className="font-serif text-3xl md:text-4xl text-wood-900 mb-4">
            AI Design Studio
           </h2>
           <p className="text-wood-800/70 max-w-xl mx-auto">
             Visualise changes instantly. Upload a photo of a piece and describe how you want to change it—new finish, different fabric, or a new setting.
           </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          
          {/* Controls & Input */}
          <div className="bg-wood-50 p-8 rounded-xl shadow-sm border border-wood-200">
             
             {/* Image Uploader */}
             <div 
                onClick={() => fileInputRef.current?.click()}
                className="w-full h-64 border-2 border-dashed border-wood-300 rounded-lg flex flex-col items-center justify-center cursor-pointer hover:bg-wood-100/50 transition-colors mb-6 overflow-hidden relative"
             >
                {image ? (
                  <img src={image} alt="Original" className="w-full h-full object-contain" />
                ) : (
                  <div className="text-center p-6">
                    <Upload className="w-10 h-10 text-wood-400 mx-auto mb-3" />
                    <p className="text-wood-500 font-medium">Click to upload an image</p>
                    <p className="text-wood-400 text-xs mt-1">JPG or PNG, max 4MB</p>
                  </div>
                )}
                <input 
                  type="file" 
                  ref={fileInputRef} 
                  className="hidden" 
                  accept="image/png, image/jpeg" 
                  onChange={handleImageUpload}
                />
             </div>

             {/* Prompt Input */}
             <div className="space-y-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-wood-500 mb-2">
                    Your Instruction
                  </label>
                  <textarea
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    placeholder="E.g., 'Change the wood to dark walnut', 'Add a vintage rug', 'Make it look like a sketch'"
                    className="w-full bg-white border border-wood-200 rounded-lg p-4 text-wood-900 placeholder:text-wood-300 focus:outline-none focus:ring-2 focus:ring-wood-300 h-24 resize-none"
                  />
                </div>

                {error && (
                  <div className="p-3 bg-red-50 text-red-600 text-sm rounded-md border border-red-100">
                    {error}
                  </div>
                )}

                <button
                  onClick={handleGenerate}
                  disabled={!image || !prompt || loading}
                  className="w-full py-4 bg-wood-900 text-wood-50 font-serif text-lg rounded-lg hover:bg-black disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                      Designing...
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-5 h-5 mr-2" />
                      Generate Design
                    </>
                  )}
                </button>
             </div>
          </div>

          {/* Result Area */}
          <div className="bg-wood-900 rounded-xl p-1 shadow-2xl min-h-[400px] flex items-center justify-center relative overflow-hidden">
             {resultImage ? (
                <div className="relative group w-full h-full">
                  <img src={resultImage} alt="Generated" className="w-full h-auto rounded-lg" />
                  <a 
                    href={resultImage} 
                    download="woodflex-design.png"
                    className="absolute bottom-4 right-4 p-3 bg-white/90 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white text-wood-900"
                    title="Download Image"
                  >
                    <Download size={20} />
                  </a>
                </div>
             ) : (
                <div className="text-center p-12 opacity-30">
                   <ImageIcon className="w-20 h-20 text-wood-50 mx-auto mb-4" />
                   <p className="text-wood-50 font-serif text-xl">Your design will appear here</p>
                </div>
             )}
             
             {loading && (
                <div className="absolute inset-0 bg-wood-900/50 backdrop-blur-sm flex items-center justify-center z-20 rounded-lg">
                   <div className="text-center">
                      <div className="w-16 h-1 bg-wood-500/30 rounded-full overflow-hidden mb-4 mx-auto">
                        <div className="w-full h-full bg-wood-50 animate-progress origin-left"></div>
                      </div>
                      <p className="text-wood-50 font-light tracking-widest uppercase text-xs">Processing pixels</p>
                   </div>
                </div>
             )}
          </div>

        </div>
      </div>
      <style>{`
        @keyframes progress {
          0% { transform: scaleX(0); }
          50% { transform: scaleX(0.7); }
          100% { transform: scaleX(1); }
        }
        .animate-progress {
          animation: progress 2s infinite ease-in-out;
        }
      `}</style>
    </section>
  );
};