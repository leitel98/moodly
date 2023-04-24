import Image from 'next/image'


const Homepage = (): JSX.Element => {
  return (
    <div className="flex flex-col bg-charcoal pt-20 min-h-screen items-center">
      <section id="hero" className='space-y-12'>
        {/* header content */}
        <div className='flex flex-col md:flex-row items-center justify-center space-y-8 md:space-y-0 md:space-x-12'>
          <Image
            src="/face.png"
            alt=''
            width={200}
            height={100}
            className='rounded-full shadow-lg'
          />
          <div className='flex flex-col space-y-6 max-w-lg items-center md:items-left text-white'>
            <h1 className="text-4xl md:text-6xl font-bold">
              Moodly
            </h1>
            <p className='text-2xl max-w-md md:max-w-lg'>
              Moodly is an app intended to function as an assistant to keep track of your emotions, goals, achievements, routines and notes. Create an account and start the journey to self-knowledge and organization.
            </p>
          </div>
        </div>
        {/* track of your feelings */}
        <div className="flex flex-col py-10 space-y-6 md:space-y-0 md:flex-row-reverse">
          {/* images container */}
          <div className="flex flex-row space-x-4 justify-center items-center mb-6 md:ml-6">
            <Image
              src="/happy.png"
              alt=''
              width={200}
              height={100}
              className='rounded-xl shadow-lg'
            />
            <Image
              src="/sad.png"
              alt=''
              width={200}
              height={100}
              className='rounded-xl shadow-lg'
            />
          </div>
          {/* description container */}
          <div className='flex flex-col space-y-4 max-w-md items-center md:items-left text-white'>
            <h1 className="text-3xl md:text-4xl font-bold">
              Keep track of your feelings
            </h1>
            <p className='text-lg'>
              We provide a private enviroment for you to keep track of your feelings and emotions, displaying them in a colorfull dashboard so you can interpret them on a funny and graphicall way.
            </p>
          </div>
        </div>
        {/* routine maker */}
        <div className='flex flex-col md:flex-row items-center justify-center md:text-left space-y-8 md:space-y-0 md:space-x-12'>
          <Image
            src="/routine.png"
            alt=''
            width={250}
            height={100}
            className='rounded-xl shadow-lg'
          />
          <div className='flex flex-col space-y-4 max-w-md items-center justify-center md:items-start  text-white'>
            <h1 className="text-3xl md:text-4xl font-bold">
              Set up a routine
            </h1>
            <p className='text-lg'>
              Create your daily routine to build up habits and keep track of your own compilance statistics.
            </p>
          </div>
        </div>
      </section>
      <footer className='bg-black py-8 px-6 mt-24 w-full text-white'>
        <div className="flex flex-col space-y-4 md:space-y-0 md:space-x-6 md:flex-row justify-center items-center">
          <h1>Created by Lucas Eitel</h1>
          <p>GitHub: https://github.com/leitel98</p>
        </div>
      </footer>
    </div>
  )
}

export default Homepage