import ThemeToggle from '@/components/ThemeToggle';

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center space-y-4 py-4">
      <ThemeToggle />
      <h1 className="inline-block bg-gradient-to-r from-red-500 via-green-500 to-violet-500 bg-clip-text text-6xl text-transparent">
        Hello World
      </h1>
      <div>
        <p className="text-3xl font-thin">안녕하세요</p>
        <p className="text-3xl font-extralight">안녕하세요</p>
        <p className="text-3xl font-light">안녕하세요</p>
        <p className="text-3xl font-normal">안녕하세요</p>
        <p className="text-3xl font-medium">안녕하세요</p>
        <p className="text-3xl font-semibold">안녕하세요</p>
        <p className="text-3xl font-bold">안녕하세요</p>
        <p className="text-3xl font-extrabold">안녕하세요</p>
        <p className="text-3xl font-black">안녕하세요</p>
      </div>
    </div>
  );
}
