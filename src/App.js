import React, { useState } from 'react';
import { Dna, ArrowRight, Info } from 'lucide-react';
import * as bioUtils from './bioUtils';

const DNAConverter = () => {
  const [sequence, setSequence] = useState('');
  const [results, setResults] = useState(null);
  const [error, setError] = useState('');

  const handleConvert = () => {
    // Verifica se tem algo digitado
    if (!sequence.trim()) {
      setError('Please enter a DNA sequence');
      setResults(null);
      return;
    }

    // Limpa e valida a sequência usando bioUtils
    const cleaned = bioUtils.validateSequence(sequence);
    
    // Verifica se sobrou algo após limpar
    if (cleaned.length === 0) {
      setError('Invalid sequence. Please use only A, T, G, C characters.');
      setResults(null);
      return;
    }

    // Limpa o erro
    setError('');
    
    // Faz todas as conversões usando bioUtils
    const complement = bioUtils.getComplement(cleaned);
    const rna = bioUtils.transcribe(cleaned);
    const protein = bioUtils.translate(rna);
    const nucleotideCounts = bioUtils.countNucleotides(cleaned);
    const gcContent = bioUtils.calculateGC(cleaned);

    // Salva tudo no estado results
    setResults({
      original: cleaned,
      complement,
      rna,
      protein,
      nucleotideCounts,
      gcContent,
      length: cleaned.length
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8 pt-8">
          <h1 className="text-4xl font-bold text-gray-800">DNA Sequence Converter</h1>
          <p className="text-gray-600 mt-2">Transcribe DNA to RNA and translate to proteins</p>
        </div>

        {/* Input Section */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Enter DNA Sequence (A, T, G, C)
          </label>
          <textarea
            value={sequence}
            onChange={(e) => setSequence(e.target.value)}
            className="w-full h-32 p-3 border-2 border-gray-300 rounded-lg focus:border-indigo-500 focus:outline-none font-mono text-sm"
            placeholder="ATGGCCATTGTAATGGGCCGCTGAAAGGGTGCCCGATAG"
          />
          
          {error && (
            <div className="mt-2 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
              {error}
            </div>
          )}

          <button
            onClick={handleConvert}
            className="mt-4 w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
          >
            Convert Sequence
          </button>
        </div>

        {/* Results Section */}
        {results && (
          <div className="space-y-4">
            {/* Statistics */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">Sequence Statistics</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                
                <div className="bg-blue-50 p-4 rounded-lg">
                  <div className="text-sm text-gray-600">Length</div>
                  <div className="text-2xl font-bold text-blue-600">{results.length} bp</div>
                </div>

                <div className="bg-green-50 p-4 rounded-lg">
                  <div className="text-sm text-gray-600">GC Content</div>
                  <div className="text-2xl font-bold text-green-600">{results.gcContent}%</div>
                </div>

                <div className="bg-purple-50 p-4 rounded-lg col-span-2 md:col-span-1">
                  <div className="text-sm text-gray-600 mb-2">Nucleotides</div>
                  <div className="grid grid-cols-4 gap-2 text-center">
                    <div>
                      <div className="text-xs text-gray-500">A</div>
                      <div className="font-bold text-purple-600">{results.nucleotideCounts.A}</div>
                    </div>
                    <div>
                      <div className="text-xs text-gray-500">T</div>
                      <div className="font-bold text-purple-600">{results.nucleotideCounts.T}</div>
                    </div>
                    <div>
                      <div className="text-xs text-gray-500">G</div>
                      <div className="font-bold text-purple-600">{results.nucleotideCounts.G}</div>
                    </div>
                    <div>
                      <div className="text-xs text-gray-500">C</div>
                      <div className="font-bold text-purple-600">{results.nucleotideCounts.C}</div>
                    </div>
                  </div>
                </div>

              </div>
            </div>

            {/* Sequences */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">Results</h2>
              
              <div className="space-y-4">
                <div>
                  <div className="text-sm font-semibold text-gray-600 mb-1">Original DNA (5' → 3')</div>
                  <div className="bg-blue-50 p-3 rounded font-mono text-sm break-all">
                    {results.original}
                  </div>
                </div>

                <div>
                  <div className="text-sm font-semibold text-gray-600 mb-1">Complementary DNA (3' → 5')</div>
                  <div className="bg-green-50 p-3 rounded font-mono text-sm break-all">
                    {results.complement}
                  </div>
                </div>

                <div>
                  <div className="text-sm font-semibold text-gray-600 mb-1">mRNA (5' → 3')</div>
                  <div className="bg-purple-50 p-3 rounded font-mono text-sm break-all">
                    {results.rna}
                  </div>
                </div>

                <div>
                  <div className="text-sm font-semibold text-gray-600 mb-1">Protein Sequence</div>
                  <div className="bg-orange-50 p-3 rounded font-mono text-sm break-all">
                    {results.protein}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Info Footer */}
        <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-4 text-sm text-gray-700 mt-6">
          <div className="font-semibold mb-2">ℹ️ About this tool:</div>
          <ul className="list-disc list-inside space-y-1">
            <li>Transcription: DNA → RNA (T becomes U)</li>
            <li>Translation: RNA → Protein (using standard genetic code)</li>
            <li>GC Content: Percentage of G and C nucleotides</li>
            <li>Stop codons (*): UAA, UAG, UGA</li>
          </ul>
        </div>

        {/* Footer */}
        <div className="text-center mt-8 pb-8 text-sm text-gray-600">
          <p>Built with React | Bioinformatics Tool</p>
          <p className="mt-1">Daniel - Biomedicina & Sistemas de Informação</p>
        </div>

      </div>
    </div>
  );
};

export default DNAConverter;