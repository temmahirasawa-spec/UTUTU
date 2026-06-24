import React from 'react';

// データ文字列の見出し規約を JSX に変換する。
//   '\n'    → <br>
//   '*word*' → <span class="v">word</span>（アクセント一語差し = var(--v)）
// server / client どちらのコンポーネントからも使える純関数（React のみ依存）。
export function accentize(text: string): React.ReactNode {
  const lines = text.split('\n');
  return lines.map((line, li) => (
    <React.Fragment key={li}>
      {line.split(/(\*[^*]+\*)/g).map((part, pi) =>
        part.startsWith('*') && part.endsWith('*') && part.length > 2 ? (
          <span className="v" key={pi}>
            {part.slice(1, -1)}
          </span>
        ) : (
          <React.Fragment key={pi}>{part}</React.Fragment>
        ),
      )}
      {li < lines.length - 1 && <br />}
    </React.Fragment>
  ));
}
