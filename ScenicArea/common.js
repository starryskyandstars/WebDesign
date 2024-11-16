const useTilt = (active) => {
    const ref = React.useRef(null);
  
    React.useEffect(() => {
      if (!ref.current || !active) return;
  
      const el = ref.current;
      const state = {
        rect: undefined,
        mouseX: undefined,
        mouseY: undefined
      };
  
      const handleMouseMove = (e) => {
        if (!el) return;
        
        if (!state.rect) {
          state.rect = el.getBoundingClientRect();
        }
        
        const px = (e.clientX - state.rect.left) / state.rect.width;
        const py = (e.clientY - state.rect.top) / state.rect.height;
  
        el.style.setProperty("--px", px);
        el.style.setProperty("--py", py);
      };
  
      el.addEventListener("mousemove", handleMouseMove);
      return () => el.removeEventListener("mousemove", handleMouseMove);
    }, [active]);
  
    return ref;
  };
  
  const Slide = ({ slide, offset }) => {
    const active = offset === 0;
    const ref = useTilt(active);
  
    return (
      <div
        ref={ref}
        className="slide"
        data-active={active || undefined}
        style={{
          "--offset": offset,
          "--dir": offset === 0 ? 0 : offset > 0 ? 1 : -1
        }}
      >
        <div className="slideBackground" style={{backgroundImage: `url('${slide.image}')`}} />
        <div className="slideContent" style={{backgroundImage: `url('${slide.image}')`}}>
          <div className="slideContentInner">
            <h2 className="slideTitle">{slide.title}</h2>
            <h3 className="slideSubtitle">{slide.subtitle}</h3>
            <p className="slideDescription">{slide.description}</p>
          </div>
        </div>
      </div>
    );
  };
  
  const App = () => {
    const [slideIndex, setSlideIndex] = React.useState(0);
  
    const handlePrev = () => {
      setSlideIndex((curr) => (curr === 0 ? slides.length - 1 : curr - 1));
    };
  
    const handleNext = () => {
      setSlideIndex((curr) => (curr + 1) % slides.length);
    };
  
    return (
      <div className="slides">
        <button onClick={handlePrev}>‹</button>
        {[...slides, ...slides, ...slides].map((slide, i) => {
          const offset = slides.length + (slideIndex - i);
          return <Slide slide={slide} offset={offset} key={i} />;
        })}
        <button onClick={handleNext}>›</button>
      </div>
    );
  };
  
  ReactDOM.render(<App />, document.getElementById("app"));