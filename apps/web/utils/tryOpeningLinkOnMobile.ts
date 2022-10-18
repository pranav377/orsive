export default function tryOpeningLinkOnMobile(relativeUrl: string) {
  window.location.replace(
    `${process.env.NEXT_PUBLIC_ORSIVE_APP_SCHEME_URL}${relativeUrl}`
  );
}
