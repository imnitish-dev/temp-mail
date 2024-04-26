import { simpleParser } from 'mailparser';
interface ParsedData {
  From?: string;
  Date?: string;
  Subject?: string;
  To?: string;
}
const regex = /([^@]+)@/;

const parseEmailData = async (emailData: string): Promise<ParsedData> => {
  const parsedData: ParsedData = {};
  const parse = await simpleParser(emailData);
  const extractEmail = parse.from?.value[0].address;
  const match = extractEmail.match(regex);
  parsedData.From = match ? match[1] : '';

  parsedData.Subject = parse.subject;
  parsedData.To = Array.isArray(parse.to) ? parse.to[0]?.text : parse.to?.text;
  parsedData['Body'] = parse.html;

  return parsedData;
};

export { parseEmailData, ParsedData };

// export const parsedData = parseEmailData(emailData);
