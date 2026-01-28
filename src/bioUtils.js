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