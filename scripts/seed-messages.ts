import { prisma } from "@/lib/db/prisma";

const sampleMessages = [
  {
    name: "Dr. Elena Rostova",
    email: "elena.rostova@compiler-lab.org",
    subject: "Technical Collaboration",
    message: "Greetings! I've been reading your articles on low-level systems engineering and was particularly fascinated by your custom WebAssembly compiler toolchain. At our research lab, we are currently developing an open-source hardware emulation framework in Rust. I believe there is a strong synergy between our telemetry parsers and your compiler. Would you be open to a brief call next week to discuss a potential joint research initiative or integration?",
    createdAt: new Date("2026-05-18T10:14:22Z"),
  },
  {
    name: "Marcus Aurelius",
    email: "m.aurelius@aero-dynamics.space",
    subject: "Technical Collaboration",
    message: "Hello, I lead the embedded software division at Aero Dynamics. We are designing a new telemetry system for orbital communications and are looking into Zero Abstraction principles for our real-time packet parsing. Your work on memory-safe low-level abstractions aligns perfectly with our safety requirements. We would love to collaborate on a reference implementation for space-grade microcontrollers. Let me know if you're interested.",
    createdAt: new Date("2026-05-19T08:32:00Z"),
  },
  {
    name: "Sarah Connor",
    email: "sconnor@cyberdyne-sys.com",
    subject: "Consulting Request",
    message: "We are currently experiencing severe performance bottlenecks in our low-level Linux kernel drivers during high-throughput sensor read cycles. Our telemetry dashboard lags by several seconds under peak load. We need an expert to audit our current codebase, identify race conditions or memory bottlenecks, and recommend optimizations. Please let us know your hourly/project rates and availability for a 4-week consulting engagement starting next month.",
    createdAt: new Date("2026-05-17T14:45:10Z"),
  },
  {
    name: "Kenji Sato",
    email: "k.sato@telemetry-labs.io",
    subject: "Consulting Request",
    message: "Hi, we are building a WebAssembly-based real-time telemetry visualizer for industrial IoT devices. We need guidance on optimizing memory layouts between JS and WASM to achieve sub-millisecond rendering times. We would like to book a few hours of architecture review and consulting. Let me know how we can proceed with scheduling.",
    createdAt: new Date("2026-05-19T11:20:15Z"),
  },
  {
    name: "Prof. Richard Feynman",
    email: "rfeynman@caltech.edu",
    subject: "Content Feedback",
    message: "I thoroughly enjoyed your latest post on quantum signal analysis! The explanation of math and physics was elegant. However, in section 3 where you derive the orbital state transition probabilities, there seems to be a minor typo in the coefficient of the second term of Equation 4.2. It should be normalized by h-bar squared instead of h-bar. Double check the dimensional analysis there. Otherwise, excellent work!",
    createdAt: new Date("2026-05-16T09:05:00Z"),
  },
  {
    name: "Linus Torvalds",
    email: "torvalds@linux-foundation.org",
    subject: "Content Feedback",
    message: "Your article on writing 'zero abstraction' kernel drivers is mostly correct, but your sample implementation of the lockless ring buffer has a subtle memory ordering bug on weak-ordered architectures like ARM64. You need an explicit memory barrier (smp_wmb) before updating the write index, otherwise the reader might see the new index before the actual data payload is written to memory. Fix it before someone copies it into production code.",
    createdAt: new Date("2026-05-18T16:50:33Z"),
  },
  {
    name: "David Johnson",
    email: "djohnson@techventures.vc",
    subject: "General Inquiry",
    message: "Hi, I'm a partner at TechVentures. We are hosting a technical roundtable on the future of WebAssembly and systems programming in late June. We would love to have you join as a panelist or guest speaker. Please let me know if you are interested and I can send over the event details and speaker package. Cheers!",
    createdAt: new Date("2026-05-15T11:30:00Z"),
  },
  {
    name: "Alice Smith",
    email: "alice.smith@gradschool.edu",
    subject: "General Inquiry",
    message: "Hello! I am a graduate student researching high-performance systems. I've read all your blog posts and found them incredibly helpful. I was wondering if you have slides or video recordings available for the presentation on WebAssembly Performance Optimizations you gave at the conference last year? Thank you for sharing your knowledge!",
    createdAt: new Date("2026-05-19T06:15:00Z"),
  },
];

async function main() {
  console.log("Seeding sample contact messages...");
  
  // Clear existing contact messages first to prevent accumulation of identical seeds
  await prisma.contactMessage.deleteMany({});
  
  for (const msg of sampleMessages) {
    await prisma.contactMessage.create({
      data: msg,
    });
  }

  console.log(`Successfully seeded ${sampleMessages.length} sample messages.`);
}

main()
  .catch((error) => {
    console.error("Error seeding messages:", error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
