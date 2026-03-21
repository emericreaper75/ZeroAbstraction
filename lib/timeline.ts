export type TimelineEntry = {
  id: string;
  date: string;
  title: string;
  description: string;
  category: 'electronics' | 'astrophysics' | 'physics-math' | 'research' | 'academic';
  tags?: string[];
};

export const timelineEntries: TimelineEntry[] = [
  {
    id: 'tl-001',
    date: '2025-03-01',
    title: 'Published Fourier Transform Derivation',
    description:
      'Completed a rigorous walk-through of the Continuous Fourier Transform from first principles, including convergence proofs and applications to differential equations.',
    category: 'physics-math',
    tags: ['fourier', 'analysis', 'publication'],
  },
  {
    id: 'tl-002',
    date: '2025-01-15',
    title: 'MEMS Calibration Suite — v2.0 Released',
    description:
      'Major release of the MEMS calibration framework. Added support for temperature-dependent noise models and automated regression testing.',
    category: 'electronics',
    tags: ['mems', 'sensors', 'release'],
  },
  {
    id: 'tl-003',
    date: '2024-11-20',
    title: 'Dark Matter Paper Accepted',
    description:
      'Submitted and accepted at MNRAS Letters: "Bayesian estimation of dark matter halos from weak lensing surveys."',
    category: 'astrophysics',
    tags: ['dark-matter', 'bayesian', 'paper'],
  },
  {
    id: 'tl-004',
    date: '2024-09-05',
    title: 'Quantum Circuit Simulator — GPU Backend',
    description:
      'Integrated CUDA-based statevector backend, achieving 12× speedup on 18-qubit circuits compared to the NumPy reference implementation.',
    category: 'physics-math',
    tags: ['quantum', 'cuda', 'simulation'],
  },
  {
    id: 'tl-005',
    date: '2024-07-10',
    title: 'Sensor Calibration Field Campaign',
    description:
      'Research log: conducted two-week field campaign to collect inertial data from UAV platform. Characterized vibration noise spectrum in real flight conditions.',
    category: 'research',
    tags: ['sensors', 'uav', 'field-work'],
  },
  {
    id: 'tl-006',
    date: '2024-03-22',
    title: 'FIR Filter Designer — Initial Release',
    description:
      'Launched interactive web tool for FIR filter design. Supports windowing methods, Parks-McClellan, and frequency sampling with live preview.',
    category: 'electronics',
    tags: ['dsp', 'filters', 'tool'],
  },
  {
    id: 'tl-007',
    date: '2023-12-01',
    title: 'MSc Thesis — Submitted',
    description:
      'Submitted MSc thesis on "Adaptive Signal Processing Techniques for GNSS Anti-Jamming Systems." Defense scheduled for January 2024.',
    category: 'academic',
    tags: ['thesis', 'gnss', 'signal-processing'],
  },
  {
    id: 'tl-008',
    date: '2023-08-14',
    title: 'Pulsar Timing Array — Data Analysis Complete',
    description:
      'Finished processing 5 years of IPTA data sets. Identified 3 new candidate millisecond pulsars and constrained gravitational wave background amplitude.',
    category: 'astrophysics',
    tags: ['pulsars', 'gravitational-waves', 'data-analysis'],
  },
];

export const timelineCategories = [
  { value: 'all', label: 'All' },
  { value: 'electronics', label: 'Electronics' },
  { value: 'astrophysics', label: 'Astrophysics' },
  { value: 'physics-math', label: 'Physics & Math' },
  { value: 'research', label: 'Research' },
  { value: 'academic', label: 'Academic' },
] as const;
