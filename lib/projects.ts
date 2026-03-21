export type Project = {
  title: string;
  description: string;
  tech: string[];
  domain: string;
  github: string;
  status: 'active' | 'completed' | 'archived';
  year: number;
};

export const projects: Project[] = [
  {
    title: 'FIR Filter Designer',
    description:
      'Interactive web tool for designing finite impulse response filters with real-time frequency response visualization using the Parks-McClellan algorithm.',
    tech: ['TypeScript', 'Next.js', 'WebAssembly', 'D3.js'],
    domain: 'Signal Processing',
    github: 'https://github.com/zero-abstraction/fir-filter-designer',
    status: 'active',
    year: 2024,
  },
  {
    title: 'Dark Matter Density Map',
    description:
      'N-body simulation pipeline for estimating dark matter density distributions from galaxy rotation curve data. GPU-accelerated with CUDA.',
    tech: ['Python', 'CUDA', 'NumPy', 'Matplotlib'],
    domain: 'Astrophysics',
    github: 'https://github.com/zero-abstraction/dark-matter-density',
    status: 'completed',
    year: 2023,
  },
  {
    title: 'Quantum Circuit Simulator',
    description:
      'A state-vector quantum circuit simulator supporting up to 20 qubits with gate decomposition, noise models, and Bloch sphere visualization.',
    tech: ['Python', 'NumPy', 'SciPy', 'Plotly'],
    domain: 'Quantum Computing',
    github: 'https://github.com/zero-abstraction/qsim',
    status: 'active',
    year: 2024,
  },
  {
    title: 'MEMS Sensor Calibration Suite',
    description:
      'Automated calibration framework for MEMS accelerometers and gyroscopes. Implements Allan Variance analysis and temperature compensation models.',
    tech: ['C++', 'Python', 'Eigen', 'Boost'],
    domain: 'Embedded Systems',
    github: 'https://github.com/zero-abstraction/mems-calibration',
    status: 'completed',
    year: 2023,
  },
  {
    title: 'Fourier Optics Toolkit',
    description:
      'Numerical toolkit for simulating electromagnetic wave propagation, diffraction patterns, and lens systems using fast Fourier transforms.',
    tech: ['Python', 'NumPy', 'FFTW', 'MPI'],
    domain: 'Optics',
    github: 'https://github.com/zero-abstraction/fourier-optics',
    status: 'active',
    year: 2025,
  },
  {
    title: 'Pulsar Timing Pipeline',
    description:
      'End-to-end data processing pipeline for pulsar timing array analysis. Implements GLS fitting, noise modeling, and gravitational wave background detection.',
    tech: ['Python', 'TEMPO2', 'Enterprise', 'MPI4Py'],
    domain: 'Radio Astronomy',
    github: 'https://github.com/zero-abstraction/pulsar-timing',
    status: 'archived',
    year: 2022,
  },
];
