import IconButton from '@/components/IconComponent';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { AiFillGithub, AiFillInstagram } from 'react-icons/ai';

export default function WhosNerd() {
  const router = useRouter();

  return (
    <main className="container mx-auto flex flex-col px-4 sm:px-6 md:px-7 lg:px-8">
      <div className="mt-4 w-full">
        <div className="grid grid-cols-2">
          <div className="mx-auto flex h-full flex-col items-center justify-center text-xl font-normal">
            The Korean HitchHiker
            <p className="mt-4 text-sm font-extralight">
              Born in Korea, having fun living here. Thanks to good people.
            </p>
          </div>
          <div className="items-start justify-start">
            <img
              className="h-60 rounded-full p-6"
              src="https://i.natgeofe.com/n/0f550dab-11fc-460e-a39b-030b6e5cbf06/practicalguide.jpg"
            />
          </div>
        </div>
        <div className="mt-4 grid grid-cols-2 gap-2">
          <div className="items-end justify-end">
            <img
              className="h-60 rounded-full p-6"
              src="https://www.siteuptime.com/blog/wp-content/uploads/2021/07/a70e911d1e1f00197ebaa00b51c8519d.jpg"
            />
          </div>
          <div className="mx-auto flex h-full flex-col items-center justify-center text-xl font-normal">
            The Developer of Unknown
          </div>
        </div>
        <div className="mt-4 grid grid-cols-2 gap-2">
          <div className="mx-auto flex h-full flex-col items-center justify-center text-xl font-normal">
            The Cafe Holic
          </div>
          <div>
            <img
              className="rounded-full p-6"
              src="https://dynamic-media-cdn.tripadvisor.com/media/photo-o/2c/9d/56/7c/caption.jpg"
            />
          </div>
        </div>
        <div>
          <div className="mx-auto flex h-full flex-col items-center justify-center text-xl font-normal">
            The Tech-heavy Investor
          </div>
          <div>
            <img className="p-6" />
          </div>
        </div>
        <div>
          <div className="flex h-full flex-col items-center justify-center">
            The Vinge F45 Attentee
          </div>
          <div>
            <img className="p-6" />
          </div>
        </div>
        <div>
          <div className="mx-auto flex h-full flex-col items-center justify-center text-xl font-normal">
            The Reader for everything
          </div>
          <div>
            <img className="p-6" />
          </div>
        </div>
        <div>
          <div className="mx-auto flex h-full flex-col items-center justify-center text-xl font-normal">
            The Blogger of life
          </div>
          <div>
            <img className="p-6" />
          </div>
        </div>
        <div>Contact</div>
        <div className="mt-10 flex items-center gap-4">
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
        </div>
      </div>
    </main>
  );
}
