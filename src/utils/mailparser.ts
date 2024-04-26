import { simpleParser } from 'mailparser';
interface ParsedData {
  From?: string;
  Date?: string;
  Subject?: string;
  To?: string;
}
const parseEmailData = async (emailData: string): Promise<ParsedData> => {
  const parsedData: ParsedData = {};
  const parse = await simpleParser(emailData);
  parsedData.From = parse.from?.value[0].address;
  parsedData.Subject = parse.subject;
  parsedData.To = Array.isArray(parse.to) ? parse.to[0]?.text : parse.to?.text;
  parsedData['Body'] = parse.html;

  return parsedData;
};

export { parseEmailData, ParsedData };

// export const parsedData = parseEmailData(emailData);
