import { Navbar } from '@/components/custom/navbar';

interface ContentLayoutProps {
  title: string;
  children: React.ReactNode;
}

export function ContentLayout({ children }: ContentLayoutProps) {
  return (
    <div>
      <Navbar />
      <div className="container pt-8 pb-8 px-4 sm:px-8 w-full">{children}</div>
    </div>
  );
}
