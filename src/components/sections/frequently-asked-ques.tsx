import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";

const faqs = [
  {
    q: "How does Splito split expenses fairly?",
    a: "Splito lets you split expenses equally, by exact amounts, or by custom shares. Everyone sees the breakdown clearly, so there’s no confusion or awkward follow-ups.",
  },
  {
    q: "What if someone pays later or only partially?",
    a: "No problem. Splito automatically adjusts balances as payments happen, keeping track of who owes what in real time.",
  },
  {
    q: "Can I use Splito for trips, flats, or teams?",
    a: "Yes. Splito is built for all kinds of groups—travel, shared living, work teams, or friends—each with their own expenses and balances.",
  },
  {
    q: "Do I need to settle every expense manually?",
    a: "No. You can settle whenever you want. Splito keeps a running balance so you don’t have to close every expense immediately.",
  },
  {
    q: "Is my financial data safe on Splito?",
    a: "Yes. Your data is securely stored and only shared with people inside your groups. We don’t expose or sell your financial information.",
  },
  {
    q: "Does everyone in a group need Splito?",
    a: "Only people involved in splitting need access. You can track expenses even if someone hasn’t settled yet.",
  },
];

export default function FAQSection() {
  return (
    <section className="w-full bg-slate-50 py-12 lg:py-24">
      <div className="mx-auto max-w-4xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-12 text-center"
        >
          <h2 className="text-4xl font-semibold text-slate-900">
            Frequently asked questions
          </h2>
          <p className="mt-3 text-slate-600">
            Everything you need to know before getting started.
          </p>
        </motion.div>
        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <FAQItem key={i} {...faq} />
          ))}
        </div>
      </div>
    </section>
  );
}

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.3 }}
      className="cursor-pointer rounded-xl bg-white shadow-sm"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <div className="flex w-full items-center justify-between px-6 py-4 text-left">
        <span className="font-medium text-slate-900">{q}</span>
      </div>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{
              height: { duration: 0.3, ease: "easeInOut" },
              opacity: { duration: 0.2, ease: "easeOut" },
            }}
            className="overflow-hidden px-6"
          >
            <div className="pb-4 text-slate-600">{a}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
