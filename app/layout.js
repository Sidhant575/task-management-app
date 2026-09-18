import './globals.css';

export const metadata = {
  title: 'Task Management Application',
  description: 'Interactive Task Management Dashboard with 3D Core Visualizer',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}