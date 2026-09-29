import { ArrowRight, ShieldCheck } from 'lucide-react'
import type { ReactNode } from 'react'
import { Link, useParams, useSearchParams } from 'react-router'
import { CtaBand, GroupTile } from '../components/Blocks'
import { Breadcrumb, Chip } from '../components/Bits'
import { HeatRule } from '../components/HeatRule'
import { Icon } from '../components/Icon'
import { SearchBox } from '../components/SearchBox'
import { t } from '../copy/en'
import { families } from '../data/families'
import { groupById, groups } from '../data/groups'
import { industries } from '../data/industries'
import { sizeCount } from '../data/rows'
import { standardChips } from '../data/standards'
import type { Family } from '../data/types'

function FamilyCard({ f }: { f: Family }) {
  return (
    <Link
      to={`/catalogue/${f.groupId}/${f.id}`}
      className="heat-top group flex flex-col border border-silver-2 bg-cream-2 p-8 transition-[transform,box-shadow] duration-300 hover:-translate-y-0.5 hover:shadow-[0_18px_36px_-24px_rgb(26_18_16_/_.55)]"
    >
      <div className="flex items-start justify-between gap-4">
        <Icon name={`fam-${f.id}`} size={40} className="text-steel" />
        <span className="t-data border border-silver-2 bg-cream px-2 !text-[13px] text-gunmetal">{f.standard}</span>
      </div>
      <h3 className="t-h3 mt-6">{f.name}</h3>
      <p className="mt-2 flex-1 text-[15px] leading-6 text-steel">{f.use}</p>
      <p className="mt-6 flex items-center justify-between border-t border-silver-2 pt-4">
        <span className="t-data !text-[14px]">
          {sizeCount([f.id])} {t.catalogue.sizes}
        </span>
        <span className="inline-flex items-center gap-2 text-[15px] font-semibold text-ember">
          {t.catalogue.viewSizes} <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" aria-hidden />
        </span>
      </p>
    </Link>
  )
}

export function Catalogue() {
  const { group: groupId } = useParams()
  const [params, setParams] = useSearchParams()
  const std = params.get('standard')
  const ind = params.get('industry')
  const group = groupId ? groupById(groupId) : undefined

  const setParam = (k: string, v: string | null) => {
    const next = new URLSearchParams(params)
    if (v) next.set(k, v)
    else next.delete(k)
    setParams(next, { replace: true })
  }

  const list = families.filter((f) => (!groupId || f.groupId === groupId) && (!std || f.standardKey === std) && (!ind || f.industries.includes(ind)))
  const showGroups = !groupId && !std && !ind
  const usedStd = standardChips.filter((s) => families.some((f) => f.standardKey === s.key && (!groupId || f.groupId === groupId)))

  return (
    <>
      <section className="border-b border-silver-2 pb-10 pt-12">
        <div className="wrap">
          <Breadcrumb items={[{ to: '/', label: 'Home' }, { to: '/catalogue', label: t.catalogue.title }, ...(group ? [{ label: group.name }] : [])]} />
          <div className="mt-6 flex items-end justify-between gap-12">
            <div>
              <h1 className="t-h1">{group ? group.name : t.catalogue.title}</h1>
              <HeatRule light animate className="mt-5 w-24" />
              <p className="measure mt-5 text-steel">{group ? group.use + '.' : t.catalogue.intro}</p>
            </div>
            <SearchBox className="w-[420px] shrink-0" />
          </div>

          <div className="mt-10 space-y-3">
            <FilterRow label={t.catalogue.group}>
              <Chip to="/catalogue" active={!groupId} keepQuery>
                {t.catalogue.all}
              </Chip>
              {groups.map((g) => (
                <Chip key={g.id} to={`/catalogue/${g.id}`} active={g.id === groupId} keepQuery>
                  {g.name}
                </Chip>
              ))}
            </FilterRow>
            <FilterRow label={t.catalogue.standard}>
              <Chip onClick={() => setParam('standard', null)} active={!std}>
                {t.catalogue.all}
              </Chip>
              {usedStd.map((s) => (
                <Chip key={s.key} onClick={() => setParam('standard', s.key === std ? null : s.key)} active={s.key === std} mono>
                  {s.label}
                </Chip>
              ))}
            </FilterRow>
            <FilterRow label={t.catalogue.industry}>
              <Chip onClick={() => setParam('industry', null)} active={!ind}>
                {t.catalogue.all}
              </Chip>
              {industries.map((i) => (
                <Chip key={i.id} onClick={() => setParam('industry', i.id === ind ? null : i.id)} active={i.id === ind}>
                  {i.name}
                </Chip>
              ))}
            </FilterRow>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="wrap">
          {groupId === 'pipes-tubes' && (
            <p className="mb-8 flex items-center gap-3 border-s-2 border-ember bg-cream-2 px-5 py-4 text-[15px] text-gunmetal">
              <ShieldCheck size={18} className="text-ember" aria-hidden />
              {t.family.approvals}
            </p>
          )}
          {showGroups ? (
            <div className="grid grid-cols-4 gap-6">
              {groups.map((g) => (
                <GroupTile key={g.id} group={g} />
              ))}
            </div>
          ) : list.length ? (
            <div className="grid grid-cols-3 gap-6">
              {list.map((f) => (
                <FamilyCard key={f.id} f={f} />
              ))}
            </div>
          ) : (
            <div className="border border-dashed border-silver-2 p-16 text-center">
              <p className="text-steel">{t.catalogue.noMatch}</p>
              <Link to="/catalogue" className="mt-4 inline-block font-semibold text-ember hover:underline">
                {t.catalogue.clear}
              </Link>
            </div>
          )}
        </div>
      </section>
      <CtaBand />
    </>
  )
}

function FilterRow({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="flex items-start gap-6">
      <span className="w-20 shrink-0 pt-1.5 text-[14px] font-semibold text-steel">{label}</span>
      <div className="flex flex-wrap gap-2">{children}</div>
    </div>
  )
}
