import { Container } from '@/components/layout/container'
import { SectionHeader } from '@/components/layout/section-header'
import { SectionCTA } from '@/components/layout/section-cta'

export interface InquiryFormSectionProps {
  id?: string
  title: string
  subtitle: string
  diameterOptions: string[]
  widthOptions: string[]
  finishOptions: string[]
}

export function InquiryFormSection({ id, title, subtitle, diameterOptions, widthOptions, finishOptions }: InquiryFormSectionProps) {
  return (
    <section id={id} className="bg-[var(--bg-base)] py-16 md:py-24 xl:py-32">
      <Container>
        <div className="max-w-2xl mx-auto">
          <SectionHeader
            heading={title}
            subheading={subtitle}
          />

          <form className="bg-[var(--bg-surface)] rounded-lg p-8 border border-[var(--border-default)]">
            <div className="space-y-6">
              {/* Full Name */}
              <div>
                <label htmlFor="fullName" className="block text-sm font-medium text-[var(--text-secondary)] mb-2">
                  Full Name *
                </label>
                <input
                  type="text"
                  id="fullName"
                  className="w-full px-4 py-3 bg-[var(--bg-card)] border border-[var(--border-default)] rounded-lg text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--border-strong)] transition-all"
                  placeholder="John Doe"
                />
              </div>

              {/* Email */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-[var(--text-secondary)] mb-2">
                  Email *
                </label>
                <input
                  type="email"
                  id="email"
                  className="w-full px-4 py-3 bg-[var(--bg-card)] border border-[var(--border-default)] rounded-lg text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--border-strong)] transition-all"
                  placeholder="john@example.com"
                />
              </div>

              {/* Phone */}
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-[var(--text-secondary)] mb-2">
                  Phone / WhatsApp
                </label>
                <input
                  type="tel"
                  id="phone"
                  className="w-full px-4 py-3 bg-[var(--bg-card)] border border-[var(--border-default)] rounded-lg text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--border-strong)] transition-all"
                  placeholder="+66 812345678"
                />
              </div>

              {/* Vehicle */}
              <div>
                <label htmlFor="vehicle" className="block text-sm font-medium text-[var(--text-secondary)] mb-2">
                  Vehicle *
                </label>
                <input
                  type="text"
                  id="vehicle"
                  className="w-full px-4 py-3 bg-[var(--bg-card)] border border-[var(--border-default)] rounded-lg text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--border-strong)] transition-all"
                  placeholder="e.g., 2024 BMW M3 G80"
                />
              </div>

              {/* Diameter */}
              <div>
                <label htmlFor="diameter" className="block text-sm font-medium text-[var(--text-secondary)] mb-2">
                  Preferred Diameter *
                </label>
                <select
                  id="diameter"
                  className="w-full px-4 py-3 bg-[var(--bg-card)] border border-[var(--border-default)] rounded-lg text-[var(--text-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--border-strong)] transition-all"
                >
                  <option value="">Select diameter</option>
                  {diameterOptions.map((option) => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </select>
              </div>

              {/* Width */}
              <div>
                <label htmlFor="width" className="block text-sm font-medium text-[var(--text-secondary)] mb-2">
                  Preferred Width *
                </label>
                <select
                  id="width"
                  className="w-full px-4 py-3 bg-[var(--bg-card)] border border-[var(--border-default)] rounded-lg text-[var(--text-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--border-strong)] transition-all"
                >
                  <option value="">Select width</option>
                  {widthOptions.map((option) => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </select>
              </div>

              {/* Finish */}
              <div>
                <label htmlFor="finish" className="block text-sm font-medium text-[var(--text-secondary)] mb-2">
                  Preferred Finish *
                </label>
                <select
                  id="finish"
                  className="w-full px-4 py-3 bg-[var(--bg-card)] border border-[var(--border-default)] rounded-lg text-[var(--text-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--border-strong)] transition-all"
                >
                  <option value="">Select finish</option>
                  {finishOptions.map((option) => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </select>
              </div>

              {/* Message */}
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-[var(--text-secondary)] mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  rows={4}
                  className="w-full px-4 py-3 bg-[var(--bg-card)] border border-[var(--border-default)] rounded-lg text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--border-strong)] transition-all resize-none"
                  placeholder="Tell us about your build, any special requirements..."
                ></textarea>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full px-8 py-4 bg-[var(--border-strong)] text-[var(--text-primary)] font-semibold rounded-lg hover:bg-[var(--border-default)] transition-colors"
              >
                Send Inquiry
              </button>
            </div>
          </form>

          <p className="text-sm text-[var(--text-muted)] mt-6 text-center">
            We typically respond within 4 hours during business days.
          </p>
        </div>
      </Container>
    </section>
  )
}
