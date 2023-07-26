import * as Ariakit from "@ariakit/react";
import "./sharmo.css";
import twt from '../assets/tw.jpg'


export function Sharmo() {
  const hovercard = Ariakit.useHovercardStore();
  const element = (
    <span className="hovercard-wrapper">
      <Ariakit.HovercardAnchor
        store={hovercard}
        href="https://twitter.com/scoopsahoykid"
        className="anchor"
      >
        @Ebrahim Ramadan
      </Ariakit.HovercardAnchor>
      <Ariakit.HovercardDisclosure store={hovercard} className="disclosure">
        <Ariakit.VisuallyHidden>
          More details about @Ebrahim Ramadan
        </Ariakit.VisuallyHidden>
        {/* {chevronDown} */}
      </Ariakit.HovercardDisclosure>
      <Ariakit.Hovercard
        portal
        store={hovercard}
        gutter={16}
        className="hovercard"
      >
        <img
          src={twt}
          alt="Ariakit"
          className="avatar"
        />
        <Ariakit.HovercardHeading className="username">
          Ebrahim Ramadan
        </Ariakit.HovercardHeading>
        <p>full stack dev</p>
        <a href="http://github.com/ebrahim-Ramadan/" className="button">
          github
        </a>
      </Ariakit.Hovercard>
    </span>
  );
  return (
    <p id="mainP">{element}  developed this app</p>
  );
}
