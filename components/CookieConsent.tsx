import { useEffect, useState } from 'react';

const CookieConsent = () => {
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('cookie-consent');
    if (!consent) {
      setShowBanner(true);
    }
  }, []);

  const acceptCookies = () => {
    localStorage.setItem('cookie-consent', 'true');
    setShowBanner(false);
  };

  if (!showBanner) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 bg-white p-4 shadow-md">
      <div className="container mx-auto flex items-center justify-between">
        <p className="text-sm">
          이 웹사이트는 사용자 경험 개선을 위해 쿠키를 사용합니다. 계속
          사용하시면 쿠키 사용에 동의하는 것으로 간주됩니다.
        </p>
        <button
          onClick={acceptCookies}
          className="ml-4 rounded bg-orange-400 px-4 py-2 text-sm text-white hover:bg-orange-500"
        >
          동의
        </button>
      </div>
    </div>
  );
};

export default CookieConsent;
