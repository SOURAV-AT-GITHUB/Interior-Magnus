export default function SofaIcon({ isActive=false}) {
  return (
    <svg
      width="41"
      height="41"
      viewBox="0 0 41 41"
      className={`${isActive ? "fill-white" : "fill-secondary"} ease-in duration-300`}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M4.42527 27.9937V30.5408C4.42527 30.575 4.42527 30.6114 4.42741 30.6521C4.42527 30.6927 4.42527 30.7291 4.42527 30.7634C4.42527 32.7967 5.87858 34.4984 7.80286 34.8815V39.4041C7.80286 39.8579 8.17094 40.5 8.6247 40.5C9.07847 40.5 9.44669 39.8579 9.44669 39.4041V34.9628H31.3837V39.4041C31.3837 39.8579 31.7518 40.5 32.2056 40.5C32.6594 40.5 33.0275 39.8579 33.0275 39.4041V34.9436C35.1636 34.7488 36.8438 32.9487 36.8438 30.7612C36.8438 30.727 36.8438 30.6906 36.8417 30.6499C36.8438 30.6093 36.8438 30.5729 36.8438 30.5386V27.8802C37.822 27.4457 38.6653 26.7672 39.3096 25.8918C40.0887 24.8301 40.4997 23.5716 40.4997 22.2531C40.4997 18.8391 37.7385 16.0629 34.3441 16.0629C33.9674 16.0629 33.597 16.0886 33.2375 16.14L33.2353 12.9336C33.2353 10.6092 31.3454 0.5 29.0209 0.5H11.8099C9.48543 0.5 7.59545 10.6092 7.59545 12.9336V16.14C7.29151 16.1122 6.97902 16.0993 6.65584 16.0993C5.012 16.0993 3.4645 16.7393 2.30225 17.9016C1.14 19.0638 0.500002 20.6113 0.500002 22.2552C0.497861 24.8087 2.08362 27.0838 4.42527 27.9937ZM9.23688 12.934C9.23688 11.517 10.3906 2.14384 11.8075 2.14384H29.0185C30.4354 2.14384 31.5891 11.517 31.5891 12.934L31.5912 16.5727C31.1203 16.761 30.688 17.0007 30.3048 17.2876C29.0527 18.225 28.3442 19.6249 28.2564 21.3351V21.3779V26.3415C26.527 25.9541 24.7076 25.708 22.8284 25.6074C21.0283 25.511 19.1726 25.5474 17.3106 25.7165C15.4313 25.8856 13.9351 26.1553 13.0105 26.35L13.0126 21.38C13.0169 19.9695 12.5396 18.7409 11.6299 17.8291C11.0049 17.2019 10.1958 16.7374 9.23908 16.4506L9.23688 12.934ZM6.65557 17.7413C8.33579 17.7413 9.65431 18.1715 10.4655 18.987C11.067 19.5906 11.3709 20.3954 11.3687 21.3736V21.3757V27.3861C11.3687 27.643 11.4886 27.8849 11.6919 28.0411C11.8953 28.1973 12.1607 28.2487 12.409 28.1802C12.4282 28.1738 14.4295 27.628 17.4604 27.354C20.26 27.1015 24.5108 27.0394 28.8708 28.1824C29.1169 28.2466 29.3802 28.1931 29.5814 28.0389C29.7826 27.8827 29.9003 27.643 29.9003 27.3883V21.3992C30.0887 17.9746 33.3464 17.707 34.3417 17.707C36.831 17.707 38.8537 19.7468 38.8537 22.2533C38.8537 24.2032 37.6101 25.924 35.7608 26.5383C35.4248 26.6496 35.1979 26.9643 35.1979 27.3196V30.5409C35.1979 30.5645 35.1979 30.5923 35.1958 30.6265V30.68C35.1979 30.7143 35.1979 30.74 35.1979 30.7657C35.1979 32.174 34.0506 33.3213 32.6422 33.3213H8.6247C7.21632 33.3213 6.06903 32.174 6.06903 30.7657C6.06903 30.7421 6.06903 30.7143 6.07117 30.68V30.6265C6.06903 30.5923 6.06903 30.5666 6.06903 30.5409V27.4009C6.06903 27.0306 5.82075 26.7053 5.46328 26.609C3.50695 26.076 2.14136 24.2845 2.14136 22.2554C2.14136 19.7661 4.16625 17.7413 6.65557 17.7413Z" />
    </svg>
  );
}
