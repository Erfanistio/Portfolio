import { useEffect, useRef } from "react";
import gsap from "gsap";

const digits = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];

function DigitRoll({ className = "", wrapRef }) {
  return (
    <span className={"odometer-digit-group " + className} aria-hidden="true">
      <span ref={wrapRef} className="odometer-digit-wrap">
        {digits.map((digit, index) => (
          <span key={index} className="odometer-digit">
            {digit}
          </span>
        ))}
      </span>
    </span>
  );
}

export default function Loader({ onComplete }) {
  const loaderRef = useRef(null);
  const progressTrackRef = useRef(null);
  const progressFillRef = useRef(null);
  const numbersRef = useRef(null);
  const firstDigitRef = useRef(null);
  const secondDigitRef = useRef(null);
  const thirdDigitRef = useRef(null);
  const percentageRef = useRef(null);

  useEffect(() => {

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const firstTens = gsap.utils.random(2, 4, 1);
    const firstOnes = gsap.utils.random(1, 5, 1);
    const secondTens = gsap.utils.random(5, 6, 1);
    const secondOnes = gsap.utils.random(7, 9, 1);
    const firstStop = Number(String(firstTens) + String(firstOnes));
    const secondStop = Number(String(secondTens) + String(secondOnes));

    const finish = () => {
      onComplete?.();
    };

    const context = gsap.context(() => {
      gsap.set(progressFillRef.current, {
        scaleY: 0,
        transformOrigin: "bottom center",
      });
      gsap.set(firstDigitRef.current, { yPercent: 100 });
      gsap.set([secondDigitRef.current, thirdDigitRef.current], { yPercent: 10 });
      gsap.set(percentageRef.current, { yPercent: 100 });

      if (reducedMotion) {
        gsap.set(progressFillRef.current, { scaleY: 1 });
        gsap.set(firstDigitRef.current, { yPercent: 0 });
        gsap.set([secondDigitRef.current, thirdDigitRef.current], { yPercent: -90 });
        gsap.set(percentageRef.current, { yPercent: 0 });

        gsap.timeline({ onComplete: finish })
          .to({}, { duration: 0.35 })
          .to(loaderRef.current, {
            yPercent: -100,
            duration: 0.45,
            ease: "power2.inOut",
          });
        return;
      }

      gsap.timeline({
        defaults: { duration: 0.82, ease: "expo.inOut" },
        onComplete: finish,
      })
        .to(progressFillRef.current, { scaleY: firstStop / 100 }, 0)
        .to(percentageRef.current, { yPercent: 0 }, 0)
        .to(secondDigitRef.current, { yPercent: (firstTens - 1) * -10 }, 0)
        .to(thirdDigitRef.current, { yPercent: (firstOnes - 1) * -10 }, 0)
        .to(progressFillRef.current, { scaleY: secondStop / 100 })
        .to(secondDigitRef.current, { yPercent: (secondTens - 1) * -10 }, "<")
        .to(thirdDigitRef.current, { yPercent: (secondOnes - 1) * -10 }, "<")
        .to(progressFillRef.current, { scaleY: 1 })
        .to(secondDigitRef.current, { yPercent: -90 }, "<")
        .to(thirdDigitRef.current, { yPercent: -90 }, "<")
        .to(firstDigitRef.current, { yPercent: 0 }, "<")
        .to({}, { duration: 0.28 })
        .to(progressTrackRef.current, {
          scaleY: 0,
          transformOrigin: "top center",
          duration: 0.68,
        })
        .to(
          [firstDigitRef.current, secondDigitRef.current, thirdDigitRef.current],
          {
            yPercent: -100,
            stagger: 0.08,
            duration: 0.72,
          },
          "<",
        )
        .to(percentageRef.current, { yPercent: -100, duration: 0.72 }, "<")
        .to(numbersRef.current, { autoAlpha: 0, duration: 0.18 })
        .to(loaderRef.current, {
          yPercent: -100,
          duration: 1.25,
          ease: "expo.inOut",
        });
    }, loaderRef);

    return () => {
      context.revert();
    };
  }, [onComplete]);

  return (
    <div
      ref={loaderRef}
      role="status"
      aria-live="polite"
      aria-label="Loading"
      className="odometer-loader fixed inset-0 z-[99999] overflow-hidden"
    >
      <span className="sr-only">Loading</span>

      <span ref={progressTrackRef} className="odometer-progress" aria-hidden="true">
        <span ref={progressFillRef} className="odometer-progress-fill" />
      </span>

      <div ref={numbersRef} className="odometer-numbers" aria-hidden="true">
        <span className="odometer-digit-group odometer-first-group">
          <span ref={firstDigitRef} className="odometer-digit-wrap">
            <span className="odometer-digit">1</span>
          </span>
        </span>

        <DigitRoll wrapRef={secondDigitRef} />
        <DigitRoll wrapRef={thirdDigitRef} />

        <span className="odometer-percentage-group">
          <span ref={percentageRef} className="odometer-percentage">%</span>
        </span>
      </div>
    </div>
  );
}
