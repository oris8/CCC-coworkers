import colors from '@/constants/Color';

export default function stringToHex(inp: string | number): string {
  const encoder = new TextEncoder();
  const bytes = encoder.encode(String(inp));
  let sum = 0;

  for (let i = 0; i < bytes.length; i += 1) {
    sum += bytes[i];
  }

  return colors[sum % colors.length];
}
