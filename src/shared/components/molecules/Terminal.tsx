import s from './Terminal.module.css'

interface Props {
  prompt?: string
  command?: string
  output?: string
  label?: string
}

/** Mock terminal pane: frame, title, prompt + command line and output. */
export function Terminal({ prompt = '$ ', command, output, label = 'เทอร์มินัลจำลอง' }: Props) {
  return (
    <section className={s.terminal} aria-label={label}>
      <span className={s.terminalTitle}>เทอร์มินัล</span>
      {command && <code
        className={s.command}
        data-el="terminal-command"
        data-revealed-fraction="0"
      ><span data-el="terminal-prompt">{prompt}</span>{command}</code>}
      {output && <pre
        className={s.output}
        data-el="terminal-output"
        data-revealed-fraction="0"
      >{output}</pre>}
    </section>
  )
}
