export const metadata = {
  title: 'Culinary Canvas | Home',
  description: 'Discover delicious recipes and cooking techniques',
};
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      {' '}
      <body className="bg-gradient-to-b from-orange-50 to-amber-50">
        {' '}
        {children}{' '}
      </body>{' '}
    </html>
  );
}
