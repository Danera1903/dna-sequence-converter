/**
 * Biological Utilities Module
 * Genetic code functions for DNA/RNA sequence analysis
 * 
 * References:
 * - NCBI Genetic Code Table 1 (Standard Code)
 * - https://www.ncbi.nlm.nih.gov/Taxonomy/Utils/wprintgc.cgi
 */

/**
 * Standard Genetic Code (NCBI Table 1)
 * Used by most organisms (nuclear genomes)
 * Note: This does not include mitochondrial or alternative genetic codes
 */

const CODON_TABLE = {
    'UUU': 'F', 'UUC': 'F', 'UUA': 'L', 'UUG': 'L',
    'UCU': 'S', 'UCC': 'S', 'UCA': 'S', 'UCG': 'S',
    'UAU': 'Y', 'UAC': 'Y', 'UAA': '*', 'UAG': '*',
    'UGU': 'C', 'UGC': 'C', 'UGA': '*', 'UGG': 'W',
    'CUU': 'L', 'CUC': 'L', 'CUA': 'L', 'CUG': 'L',
    'CCU': 'P', 'CCC': 'P', 'CCA': 'P', 'CCG': 'P',
    'CAU': 'H', 'CAC': 'H', 'CAA': 'Q', 'CAG': 'Q',
    'CGU': 'R', 'CGC': 'R', 'CGA': 'R', 'CGG': 'R',
    'AUU': 'I', 'AUC': 'I', 'AUA': 'I', 'AUG': 'M',
    'ACU': 'T', 'ACC': 'T', 'ACA': 'T', 'ACG': 'T',
    'AAU': 'N', 'AAC': 'N', 'AAA': 'K', 'AAG': 'K',
    'AGU': 'S', 'AGC': 'S', 'AGA': 'R', 'AGG': 'R',
    'GUU': 'V', 'GUG': 'V', 'GUA': 'V', 'GUG': 'V',
    'GCU': 'A', 'GCC': 'A', 'GCA': 'A', 'GCG': 'A',
    'GAU': 'D', 'GAC': 'D', 'GAA': 'E', 'GAG': 'E',
    'GGU': 'G', 'GGC': 'G', 'GGA': 'G', 'GGG': 'G'
};

/**
 * Stop codons in standard genetic code
 */
const STOP_CODONS = ['UAA', 'UAG', 'UGA'];

/**
 * Start codon (Methionine - initiates translation)
 */
const START_CODON = 'AUG';

/**
 * Validates DNA Sequence
 * @param {string} sequence - DNA sequence to validate
 * @returns {string} - Cleaned sequence (uppercase, only ATGC)
 */
export const validateSequence = (sequence) => {
    return sequence.toUpperCase().replace(/[^ATGC]/g, '');
};

/**
 * Generates complementary DNA strand
 * @param {string} dna - DNA sequence (5' to 3')
 * @return {string} - Complementary strand (3' to 5')
 */
export const getComplement = (dna) => {
    const complement = { 'A': 'T', 'T': 'A', 'G': 'C', 'C': 'G' };
    return dna.split('').map(base => complement[base]).join('');
};

/**
 * Transcribes DNA to mRNA
 * @param {string} dna - DNA sequence
 * @return {string} - mRNA sequence (T replaced by U)
 */
export const transcribe = (dna) => {
    return dna.replace(/T/g, 'U');
};

/**
 * Translates RNA sequence to protein
 * Stops at first stop codon encountered
 * @param {string} rna - RNA sequence
 * @return {string} - Protein sequence (single-letter amino acid codes)
 */
export const translate = (rna) => {
    let protein ='';

    for (let i = 0; i < rna.length - 2; i += 3) {
        const codon = rna.substring(i, i + 3);
        const aminoAcid = CODON_TABLE[codon];

        //Stop at stop codon
        if (aminoAcid === '*') break;

        if (aminoAcid) {
            protein += aminoAcid;
        }
    }

    return protein || 'No protein found';
};

/**
 * Counts individual nucleotides
 * @param {string} sequence - DNA/RNA sequence
 * @return {Object} - Count of each nucleotide
 */
export const countNucleotides = (sequence) => {
    const counts = { A: 0, T: 0, G: 0, C: 0, U: 0 };

    sequence.split('').forEach(base => {
        if (counts.hasOwnProperty(base)) {
            counts[base]++;
        }
    });

    //Remove U if DNA, remove T if RNA
    if (sequence.includes('U')) {
        delete counts.T;
    } else {
        delete counts.U;
    }

    return counts;
};

/**
 * Calculates GC content percentage
 * GC content affects DNA stability and melting temperature
 * @param {string} sequence - DNA/RNA sequence
 * @return {string} - GC percentage (2 decimal places)
 */
export const calculateGC = (sequence) => {
    const gc = (sequence.match(/[GC]/g) || []).length;
    return ((gc / sequence.length) * 100).toFixed(2);
};

/**Gets genetic code information
 * @return {Object} - Information about the genetic code used
 */

/**
 * Parses FASTA format input
 * @param {string} input - FASTA formatted text
 * @returns {Array} - Array of objects with id, description, and sequence
 */
export const parseFASTA = (input) => {
    const sequences = [];
    const lines = input.trim().split('\n');
    let currentSeq = null;

    lines.forEach(line => {
        line = line.trim();

        if (line.startsWith('>')) {
            //New sequence header
            if (currentSeq) {
                sequences.push(currentSeq);
            }

            //Parse header: >id description
            const headerParts = line.substring(1).split(' ');
            currentSeq = {
                id: headerParts[0] || 'sequence',
                description: headerParts.slice(1).join(' ') || '',
                sequence: ''
            };
        } else if (currentSeq && line) {
            //Append sequence line (remove spaces and validate)
            currentSeq.sequence += validateSequence(line);
        }
    });

    //Push last sequence
    if (currentSeq) {
        sequences.push(currentSeq);
    }

    return sequences;
};

/**
 * Detects if input is in FASTA format
 * @param {string} input - Input text
 * @returns {boolean} - True if FASTA format detected
 */
export const isFASTA = (input) => {
    return input.trim().startsWith('>');
};

export const getGeneticCodeInfo = () => {
    return {
        name: 'Standard Genetic Code',
        ncbiTable: 1,
        description: 'Used by nuclear genomes of most organisms',
        startCodon: START_CODON,
        stopCodons: STOP_CODONS,
        totalCodons: Object.keys(CODON_TABLE).length,
        limitations: [
            'Does not include mitochondrial genetic codes',
            'Does not include alternative start codons',
            'Does not handle ambiguous nucleotides (N, R, Y, etc.)'
        ]
    };
};

/**
 * Finds all stop codon positions in RNA sequence
 * @param {string} rna - RNA sequence
 * @returns {Array} - Array of stop codon positions
 */
export const findStopCodons = (rna) => {
    const stopPositions = [];
    const stopCodons = ['UAA', 'UAG', 'UGA'];

    for (let i = 0; i < rna.length - 2; i += 3) {
        const codon = rna.substring(i, i + 3);
        if (stopCodons.includes(codon)) {
            stopPositions.push({
                position: i + 1, // 1-based position
                codon: codon,
                positionEnd: i + 3
            });
        }
    }

    return stopPositions;
};

/**
 * Calculates amino acid composition
 * @param {string} protein - Protein sequence
 * @returns {Object} - Amino acid counts and percentages
 */
export const getAminoAcidComposition = (protein) => {
    if (!protein || protein === 'No protein found') {
        return {};
    }

    const counts = {};
    const total = protein.length;

    protein.split('').forEach(aa => {
        counts[aa] = (counts[aa] || 0) + 1;
    });

    const composition = {};
    Object.keys(counts).forEach(aa => {
        composition[aa] = {
            count: counts[aa],
            percentage: ((counts[aa] / total) * 100).toFixed(2)
        };
    });

    return composition;
};

/**
 * Gets detailed protein information
 * @param {string} protein - Protein sequence
 * @returns {Object} - Detailed protein metrics
 */
export const getProteinInfo = (protein) => {
    if (!protein || protein === 'No protein found') {
        return {
            length: 0,
            molecularWeight: 0,
            composition: {}
        };
    }

    // Approximate molecular weights (in Daltons)
    const aaWeights = {
        'A': 89, 'R': 174, 'N': 132, 'D': 133, 'C': 121,
        'E': 147, 'Q': 146, 'G': 75, 'H': 155, 'I': 131,
        'L': 131, 'K': 146, 'M': 149, 'F': 165, 'P': 115,
        'S': 105, 'T': 119, 'W': 204, 'Y': 181, 'V': 117
    };

    let molecularWeight = 0;
    protein.split('').forEach(aa => {
        molecularWeight += aaWeights[aa] || 0;
    });

    // Subtract water molecules (peptide bonds)
    molecularWeight -= (18 * (protein.length - 1));

    return {
        length: protein.length,
        molecularWeight: Math.round(molecularWeight),
        composition: getAminoAcidComposition(protein)
    };
};