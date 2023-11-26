import { Searcher } from '@/app/components/Searcher/Searcher'
import { Cities } from '@/app/components/Cities/Cities'

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-24 gap-12 bg-gradient-to-b from-blue-500 to-purple-800 text-white">
      <div className={'max-w-5xl'}>
        <Searcher />
        <Cities />
      </div>
    </div>
  )
}
