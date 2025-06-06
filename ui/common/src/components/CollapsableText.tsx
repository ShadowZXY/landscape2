import { createEffect, createSignal, on, Show } from 'solid-js';
import { css } from 'solid-styled-components';

import { formatSummaryField } from '../utils/formatSummaryField';

interface Props {
  text: string;
  maxLinesNumber?: number;
  class?: string;
}

const MAX_LINES = 4;
const LINE_HEIGHT = 19;

const Content = css`
  word-wrap: normal;
  white-space: inherit;
`;

const Truncate = css`
  overflow: hidden;
  text-overflow: unset;
  display: -webkit-box;
  -webkit-box-orient: vertical;
`;

const BtnWrapper = css`
  background: linear-gradient(
    to right,
    rgba(255, 255, 255, 0) 0%,
    rgba(255, 255, 255, 0.5) 10%,
    rgba(255, 255, 255, 1) 20%,
    rgba(255, 255, 255, 1) 100%
  );
  bottom: -1px;
`;

const Btn = css`
  font-size: 0.7rem !important;
  padding: 0;
  padding-left: 2.5rem;
  line-height: 1.25rem;
`;

export const CollapsableText = (props: Props) => {
  const [isLoaded, setIsLoaded] = createSignal<boolean>(false);
  const [enabledCollapsable, setEnabledCollapsable] = createSignal<boolean>(false);
  const [collapsable, setCollapsable] = createSignal<boolean>(true);
  const [textRef, setTextRef] = createSignal<HTMLDivElement>();
  const linesNumber = () => props.maxLinesNumber || MAX_LINES;

  createEffect(
    on(textRef, () => {
      if (textRef() && !isLoaded()) {
        setIsLoaded(true);
        if (textRef()!.offsetHeight > linesNumber() * LINE_HEIGHT) {
          setCollapsable(false);
          setEnabledCollapsable(true);
        }
      }
    })
  );

  return (
    <div class="position-relative">
      {/* eslint-disable solid/no-innerhtml */}
      <div
        ref={setTextRef}
        class={`${Content} ${props.class}`}
        classList={{ [Truncate]: !collapsable() }}
        style={
          !collapsable()
            ? {
                '-webkit-line-clamp': linesNumber(),
                'line-clamp': linesNumber(),
                'max-height': `${LINE_HEIGHT * linesNumber()}px`,
              }
            : {}
        }
        innerHTML={formatSummaryField(props.text)}
      />
      {/* eslint-enable solid/no-innerhtml */}
      <Show when={enabledCollapsable() && !collapsable()}>
        <div class={`position-absolute end-0 ${BtnWrapper}`}>
          <button
            class={`btn btn-sm btn-link fst-italic text-muted ${Btn}`}
            onClick={() => setCollapsable((prev) => !prev)}
            aria-label="Show more"
          >
            Show more
          </button>
        </div>
      </Show>
    </div>
  );
};
