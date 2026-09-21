// 페이지 전환: 경로가 바뀔 때마다 다시 마운트되어 커튼 + 페이드 업이 재생된다.
// JS 상태와 무관하게 반드시 끝나도록 CSS 애니메이션으로 처리한다.
export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className="page-curtain" aria-hidden />
      <div className="page-enter">{children}</div>
    </>
  );
}
