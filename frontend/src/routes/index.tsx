import { createFileRoute} from '@tanstack/react-router'
export const Route = createFileRoute('/')({
  component: HomePage,
})

function HomePage() {


  return (
    <>
      <div className='h-48 w-52'>
        <h1>Dus</h1>
      </div>
    </>
  )
}
