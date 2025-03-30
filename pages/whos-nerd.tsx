import { useRouter } from 'next/router';

export default function WhosNerd() {
  const router = useRouter();

  return (
    <main className="container mx-auto flex flex-col px-4 lg:ml-60 lg:max-w-[calc(100%-240px)]">
      <div className="mt-4 w-full">
        <div className="flex-col items-center justify-center">
          <div className="mx-auto flex justify-center">
            <img
              src="https://storage.googleapis.com/nerdinsight/otter.jpeg"
              className="size-80 rounded-full"
            />
          </div>
          <div className="mx-auto my-10 block justify-center text-center sm:w-3/4">
            Hi, Everyone. It&apos;s{' '}
            <span className="text-orange-600">Nerd</span>.
            <br />
            It is nice to meet you visiting my Blog. <br />
            Wish you have a good time here. <br />
            As a digital real estate, I made this blog to share my place and
            knowledge and experience. <br />
            <p className="text-lg text-orange-600">
              Let&apos;s grow up together!
            </p>
            <br />
            Here are my Identities below.
          </div>
        </div>
        <div className="grid grid-cols-2">
          <div className="mx-auto flex h-full flex-col items-center justify-center text-xl font-normal">
            The Korean HitchHiker
            <p className="mt-4 text-sm font-extralight">
              Born in Korea, having fun living here. Thanks to good people.
            </p>
          </div>
          <div className="flex justify-center">
            <img
              className="h-60 rounded-full p-6"
              src="https://i.natgeofe.com/n/0f550dab-11fc-460e-a39b-030b6e5cbf06/practicalguide.jpg"
            />
          </div>
        </div>
        <div className="grid grid-cols-2">
          <div className="flex justify-center">
            <img
              className="h-60 rounded-full p-6"
              src="https://www.siteuptime.com/blog/wp-content/uploads/2021/07/a70e911d1e1f00197ebaa00b51c8519d.jpg"
            />
          </div>
          <div className="mx-auto flex h-full flex-col items-center justify-center text-xl font-normal">
            The Developer of Unknown
            <p className="mt-4 text-sm font-extralight">
              Love developing apps and websites. Developing on financial area
              for living.
            </p>
          </div>
        </div>
        <div className="mt-4 grid grid-cols-2">
          <div className="mx-auto flex h-full flex-col items-center justify-center text-xl font-normal">
            The Cafe Holic
            <p className="mt-4 text-sm font-extralight">
              Love to go to cafes and enjoy good a cup of tea.
            </p>
          </div>
          <div>
            <img
              className="rounded-full p-6"
              src="https://dynamic-media-cdn.tripadvisor.com/media/photo-o/2c/9d/56/7c/caption.jpg"
            />
          </div>
        </div>
        <div className="mt-4 grid grid-cols-2">
          <div>
            <img
              className="rounded-full p-6"
              src="https://marquee-equity.com/wp-content/uploads/2021/12/Nurture-your-investor-relations-1025x873.png"
            />
          </div>
          <div className="mx-auto flex h-full flex-col items-center justify-center text-xl font-normal">
            The Tech-heavy Investor
            <p className="mt-4 text-sm font-extralight">
              Dreaming a better future, better world, investing in good
              companies.
            </p>
          </div>
        </div>
        <div className="mt-4 grid grid-cols-2">
          <div className="mx-auto flex h-full flex-col items-center justify-center text-xl font-normal">
            The Vinge F45 Attentee
            <p className="mt-4 text-sm font-extralight">
              Love to go to F45, trying hard to be fit and healthy.
            </p>
          </div>
          <div>
            <img
              className="rounded-full p-6"
              src="https://cdn.f45training.com/f45challenge/uploads/2022/09/06225201/Brand_Select_131-scaled.jpg"
            />
          </div>
        </div>
        <div className="mt-4 grid grid-cols-2">
          <div>
            <img
              className="rounded-full p-6"
              src="https://static.independent.co.uk/2024/07/27/08/newFile-2.jpg"
            />
          </div>
          <div className="mx-auto flex h-full flex-col items-center justify-center text-xl font-normal">
            The Reading Adventurer
            <p className="mt-4 text-sm font-extralight">
              Reading is a vicarious experience, Everyday, adventure in other
              life.
            </p>
          </div>
        </div>
        <div className="mt-4 grid grid-cols-2">
          <div className="mx-auto flex h-full flex-col items-center justify-center text-xl font-normal">
            The Blogger of life
            <p className="mt-4 text-sm font-extralight">
              Communicating with people, sharing good things, getting feedback.
            </p>
          </div>
          <div>
            <img
              className="rounded-full p-6"
              src="https://millennialmuminbusiness.com/wp-content/uploads/2017/06/blogging.jpg"
            />
          </div>
        </div>
        <div className="my-8"></div>
        {/* <div>Contact</div>
        <div className="mt-10 flex items-center gap-2">
          <IconButton
            Icon={AiFillInstagram}
            component={Link}
            href="https://www.instargram.com"
            target="_blank"
          />
          <IconButton
            Icon={AiFillGithub}
            component={Link}
            href="https://www.instargram.com"
            target="_blank"
          />
        </div> */}
      </div>
    </main>
  );
}
