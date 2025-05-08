'use client';

import Image from 'next/image';
import { Button } from '@/components/ui/Button';
import { SITE_CONFIG } from '@/lib/constants';
import { useRouter } from 'next/navigation';

/**
 * Home page component
 * The main landing page for the KIN Analysis System
 * @returns {JSX.Element} Rendered home page component
 */
export default function Home() {
  const router = useRouter();

  /**
   * Navigates to the dashboard page
   */
  const navigateToDashboard = () => {
    router.push('/dashboard');
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8 gap-12">
      <main className="flex flex-col items-center max-w-5xl w-full text-center">
        <h1 className="text-5xl font-bold tracking-tight mb-6">
          Welcome to {SITE_CONFIG.name}
        </h1>

        <p className="text-xl mb-8 max-w-2xl">
          A scalable analytics platform for learning and knowledge management.
          Built with modern technologies for optimal performance.
        </p>

        <div className="flex gap-4 flex-col sm:flex-row">
          <Button size="lg" className="px-8 py-3" onClick={navigateToDashboard}>
            Get Started
          </Button>

          <Button variant="outline" className="px-8 py-3">
            Learn More
          </Button>
        </div>
      </main>

      <section className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-5xl mt-12">
        <FeatureCard
          title="Analytics"
          description="Gain deep insights into learning patterns and knowledge acquisition through advanced analytics."
          icon="/icons/analytics.svg"
        />

        <FeatureCard
          title="Performance"
          description="Track performance metrics and identify areas for improvement with detailed reports."
          icon="/icons/performance.svg"
        />

        <FeatureCard
          title="Integration"
          description="Seamlessly integrate with existing learning systems and data sources."
          icon="/icons/integration.svg"
        />
      </section>

      <footer className="mt-16 text-center text-sm text-gray-500">
        <p>
          © {new Date().getFullYear()} {SITE_CONFIG.name} - All rights reserved
        </p>
      </footer>
    </div>
  );
}

/**
 * Feature card component
 * Displays a feature with icon, title, and description
 * @param {Object} props - Component props
 * @param {string} props.title - Feature title
 * @param {string} props.description - Feature description
 * @param {string} props.icon - Path to feature icon
 * @returns {JSX.Element} Rendered feature card component
 */
function FeatureCard({
  title,
  description,
  icon,
}: {
  title: string;
  description: string;
  icon: string;
}) {
  // For now, using a placeholder for the icon if it doesn't exist
  const iconPath = icon || '/placeholder.svg';

  return (
    <div className="flex flex-col items-center p-6 border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
      <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
        {/* Replace with actual icons when available */}
        <div className="w-6 h-6 text-primary">{/* Icon placeholder */}</div>
      </div>

      <h3 className="text-xl font-medium mb-2">{title}</h3>
      <p className="text-gray-600 text-center">{description}</p>
    </div>
  );
}
