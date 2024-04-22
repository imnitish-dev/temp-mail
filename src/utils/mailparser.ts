interface ParsedData {
  From?: string;
  Date?: string;
  Subject?: string;
  To?: string;
}

const parseEmailData = (emailData: string): ParsedData => {
  const lines: string[] = emailData.split(/\r?\n/);
  const parsedData: ParsedData = {};
  let currentHeader: string | null = null;
  let body: string = '';

  const allowedHeaders: string[] = ['From', 'Date', 'Subject', 'To'];

  for (const line of lines) {
    if (line.trim() === '') {
      if (currentHeader && allowedHeaders.includes(currentHeader)) {
        parsedData[currentHeader] = parsedData[currentHeader].trim();
      }
      currentHeader = null;
    } else {
      const headerMatch = line.match(/^([\w-]+):(.*)$/);
      if (headerMatch) {
        const [, headerName, headerValue] = headerMatch;
        if (allowedHeaders.includes(headerName)) {
          parsedData[headerName] = parsedData[headerName] ? `${parsedData[headerName]}\n${headerValue.trim()}` : headerValue.trim();
          currentHeader = headerName.toLocaleLowerCase();
        }
      } else {
        if (currentHeader && allowedHeaders.includes(currentHeader)) {
          parsedData[currentHeader] = parsedData[currentHeader] ? `${parsedData[currentHeader]}\n${line}` : line;
        }
        body += `${line}\n`;
      }
    }
  }

  const bodyMatch = body.trim().match(/<div dir="ltr">([\s\S]*?)<\/div>/);
  parsedData['Body'] = bodyMatch ? bodyMatch[1] : 'No body found in email.';

  return parsedData;
};

export { parseEmailData, ParsedData };
// export const parsedData = parseEmailData(emailData);
