import { useEffect, useState } from 'react';

const LINES = ['AI.', 'Agent.', 'Future.'];

const sleep = (ms: number) =>
  new Promise<void>((resolve) => setTimeout(resolve, ms));

interface State {
  done: string[];
  typing: string | null;
  showCursor: boolean;
}

export default function Terminal() {
  const [state, setState] = useState<State>({
    done: [],
    typing: '',
    showCursor: true,
  });

  useEffect(() => {
    let cancelled = false;

    const run = async () => {
      while (!cancelled) {
        const done: string[] = [];

        for (let i = 0; i < LINES.length; i++) {
          const line = LINES[i];
          // empty prompt with blinking cursor for a beat
          setState({ done: [...done], typing: '', showCursor: true });
          await sleep(280);
          if (cancelled) return;

          // type the line out
          for (let c = 1; c <= line.length; c++) {
            if (cancelled) return;
            setState({
              done: [...done],
              typing: line.slice(0, c),
              showCursor: true,
            });
            await sleep(75 + Math.random() * 55);
          }

          if (i < LINES.length - 1) {
            done.push(line);
            setState({ done: [...done], typing: null, showCursor: false });
            await sleep(420);
          } else {
            // last line — hold with blinking cursor
            await sleep(2600);
          }
        }

        if (cancelled) return;

        // clear and restart
        setState({ done: [], typing: null, showCursor: false });
        await sleep(550);
      }
    };

    run();
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div className="w-full h-full bg-white/55 backdrop-blur-2xl backdrop-saturate-150 rounded-[1.4rem] overflow-hidden flex flex-col text-neutral-900 font-mono border border-white/60 shadow-[inset_0_1px_0_rgba(255,255,255,0.8)]">
      {/* Mac chrome */}
      <div className="flex items-center px-3 py-2 border-b border-black/[0.06] bg-white/40">
        <div className="flex items-center gap-[5px]">
          <span className="w-[10px] h-[10px] rounded-full bg-[#FF5F57]" />
          <span className="w-[10px] h-[10px] rounded-full bg-[#FEBC2E]" />
          <span className="w-[10px] h-[10px] rounded-full bg-[#28C840]" />
        </div>
        <div className="flex-1 text-center text-[10px] text-neutral-500 tracking-[0.05em]">
          ~/evie — zsh
        </div>
        <div className="w-[42px]" />
      </div>

      {/* Content */}
      <div className="flex-1 p-4 md:p-5 flex flex-col gap-1.5 md:gap-2 text-[13px] md:text-[15px] leading-[1.55]">
        {state.done.map((line, i) => (
          <Line key={`done-${i}`} text={line} />
        ))}
        {state.typing !== null && (
          <Line text={state.typing} cursor={state.showCursor} />
        )}
      </div>
    </div>
  );
}

function Line({ text, cursor }: { text: string; cursor?: boolean }) {
  return (
    <div className="flex items-baseline gap-2">
      <span className="text-emerald-600 select-none">$</span>
      <span className="text-neutral-900">{text}</span>
      {cursor && (
        <span className="terminal-cursor inline-block w-[0.5em] h-[1.05em] bg-neutral-900 translate-y-[0.16em]" />
      )}
    </div>
  );
}
