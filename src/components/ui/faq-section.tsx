export interface FAQSectionProps {
  faqs: Array<{ id: number; question: string; answer: string }>
}

export function FAQSection({ faqs }: FAQSectionProps) {
  return (
    <section className="bg-[var(--bg-base)] py-16 md:py-24 xl:py-32">
      <div className="max-w-4xl mx-auto px-4 md:px-8">
        <h2 className="text-3xl md:text-4xl font-bold text-[var(--text-primary)] mb-8">
          Frequently Asked Questions
        </h2>
        <div className="space-y-4">
          {faqs.map((faq) => (
            <div key={faq.id} className="bg-[var(--bg-surface)] rounded-lg border border-[var(--border-default)] overflow-hidden">
              <details className="group">
                <summary className="flex items-center justify-between px-6 py-4 cursor-pointer hover:bg-[var(--bg-card)] transition-colors">
                  <h3 className="text-lg font-semibold text-[var(--text-primary)]">{faq.question}</h3>
                  <svg className="w-5 h-5 text-[var(--text-muted)] group-open:rotate-180 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </summary>
                <div className="px-6 py-4 bg-[var(--bg-card)] border-t border-[var(--border-default)]">
                  <p className="text-[var(--text-secondary)] leading-relaxed">{faq.answer}</p>
                </div>
              </details>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
