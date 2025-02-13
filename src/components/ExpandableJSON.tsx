import { useState } from 'react';

export function ExpandableJSON({ value }: { value: string }) {
  const [isExpanded, setIsExpanded] = useState(false);

  try {
    const parsed = JSON.parse(value);
    const formatted = JSON.stringify(parsed, null, 2);
    const firstLine = formatted.split('\n')[0];

    return (
      <div onClick={() => setIsExpanded(!isExpanded)} style={{ cursor: 'pointer' }} className="json-cell">
        {isExpanded ? (
          <pre className="mb-0 json-content">{formatted}</pre>
        ) : (
          <div className="json-preview">
            {firstLine}
            {formatted.includes('\n') && '...'}
          </div>
        )}
      </div>
    );
  } catch {
    return value;
  }
}
