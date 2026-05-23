import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Link,
  Preview,
  Text,
  Tailwind,
} from '@react-email/components';
import * as React from 'react';

export default function WelcomeEmail() {
  return (
    <Html>
      <Head />
      <Preview>Welcome to Zero Abstraction</Preview>
      <Tailwind>
        <Body className="bg-black text-zinc-300 font-sans">
          <Container className="my-10 mx-auto p-8 border border-zinc-800 rounded-lg bg-[#050810]">
            <Heading className="text-2xl font-serif text-white mb-6">
              Welcome to Zero Abstraction
            </Heading>
            <Text className="text-zinc-400 text-base leading-relaxed mb-6">
              Thanks for subscribing to the newsletter! You&apos;ll now receive updates on my latest engineering projects, research logs, and technical deep-dives into First-Principles engineering.
            </Text>
            <Text className="text-zinc-400 text-base leading-relaxed mb-6">
              If you want to check out some of my interactive projects, start here:
            </Text>
            <Link 
              href="https://zero-abstraction.com/projects" 
              className="inline-block bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 px-6 py-3 rounded-md font-mono text-sm no-underline hover:bg-cyan-500/20"
            >
              Explore Projects
            </Link>
            <Text className="text-zinc-600 text-sm mt-10 border-t border-zinc-800 pt-6">
              If you didn&apos;t request this, you can safely ignore this email.
            </Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
}
