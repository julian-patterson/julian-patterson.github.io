const fadeInSection = {
  opacity: 0,
  transform: "translateY(20vh)",
  visibility: "hidden",
  transition: "opacity 0.6s ease-out, transform 1.2s ease-out",
};

const fadeInSectionIsVisible = {
  opacity: 1,
  transform: "none",
  visibility: "visible",
};

// const FadeIn: FC = (props) => {
//     const [isVisible, setVisible] = useState(true);
//     const domRef = useRef();
//     useEffect(() => {
//         const observer = new IntersectionObserver(entries => {
//         entries.forEach(entry => setVisible(entry.isIntersecting));
//         });
//         observer.observe(domRef.current);
//     return () => observer.unobserve(domRef.current);
//     }, []);
//     return(
//         <div className={`fade-in-section ${isVisible ? 'is-visible' : ''}`} ref={domRef}>
//             {props.children}
//         </div>
//     );
// };

// export default FadeIn;

export {};
