BOUNDY METACADY 웹 배포 (GitHub Pages)
=======================================
이 dist/web 폴더의 내용을 GitHub 저장소 github.com/boundy4/metacady 에 통째로 올리고
Settings > Pages 에서 Branch 를 main / (root) 로 켜면 1~2분 뒤 아래 주소로 공개됩니다.

  랜딩(홈)   https://boundy4.github.io/metacady/
  프로그램   https://boundy4.github.io/metacady/app/
  기초 메뉴얼 https://boundy4.github.io/metacady/manual/METACADY-Manual-Basic.pdf
  상세 메뉴얼 https://boundy4.github.io/metacady/manual/METACADY-Manual-Detail.pdf

폴더 구조:
  index.html          랜딩(홈페이지)
  app/index.html      프로그램(난독화됨)
  manual/*.pdf         사용 설명서

올리는 방법 (둘 중 하나):
  · GitHub 웹: 저장소 페이지 > Add file > Upload files 로 index.html · app 폴더 · manual 폴더를 끌어다 놓고 Commit.
  · 또는 Git: 이 폴더에서  git init && git add . && git commit -m metacady && git branch -M main && git remote add origin https://github.com/boundy4/metacady.git && git push -u origin main

블로그(블로그스팟) 게시글의 HTML 보기에 아래를 붙여 넣으면 글 안에서 바로 실행됩니다:
  <iframe src="https://boundy4.github.io/metacady/app/" style="width:100%;height:80vh;border:0"></iframe>

버전을 올릴 때마다  node build.js · node dev/manual/make.js · node dev/build-web.js  를 실행하고
이 dist/web 폴더를 다시 올리면 됩니다(파일 이름이 고정이라 위 링크는 그대로 유지).
