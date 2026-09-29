import { Link } from 'react-router'
import { Breadcrumb } from '../components/Bits'
import { CertBand, CtaBand, GradesTable } from '../components/Blocks'
import { HeatRule } from '../components/HeatRule'
import { Section } from '../components/Section'
import { t } from '../copy/en'
import { families } from '../data/families'
import { standardChips } from '../data/standards'

export function Standards() {
  return (
    <>
      <section className="pb-6 pt-12">
        <div className="wrap">
          <Breadcrumb items={[{ to: '/', label: 'Home' }, { label: 'Standards' }]} />
          <h1 className="t-h1 mt-6">Standards and certificates</h1>
          <HeatRule light animate className="mt-5 w-24" />
          <p className="measure mt-5 text-steel">Every product we stock is made to a named standard. Find yours, match the grade, and see the paperwork that comes with it.</p>
        </div>
      </section>

      <Section title="Standards we stock to">
        <div className="grid grid-cols-2 gap-x-8">
          {standardChips.map((s) => {
            const fams = families.filter((f) => f.standardKey === s.key)
            return (
              <div key={s.key} className="grid grid-cols-[160px_1fr] gap-6 border-b border-silver-2 py-5">
                <Link to={`/catalogue?standard=${s.key}`} className="t-data text-oxblood hover:text-ember">
                  {s.label}
                </Link>
                <ul className="flex flex-wrap gap-x-4 gap-y-1 text-[15px]">
                  {fams.map((f) => (
                    <li key={f.id}>
                      <Link to={`/catalogue/${f.groupId}/${f.id}`} className="text-gunmetal hover:text-ember">
                        {f.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )
          })}
        </div>
      </Section>

      <Section title={t.grades.title} intro={t.grades.intro} className="bg-cream-2">
        <div className="border border-silver-2 bg-cream">
          <GradesTable />
        </div>
      </Section>

      <Section title={t.certs.title} intro={t.certs.intro}>
        <CertBand />
      </Section>
      <CtaBand />
    </>
  )
}
