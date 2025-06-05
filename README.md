# 📁 파일 이동 마스터

Next.js + Electron 기반의 데스크탑 파일 이동 도구입니다.
사용자는 폴더를 선택해 실제 파일을 빠르고 직관적으로 이동할 수 있습니다.

---

## 🧩 요구사항

- Node.js ≥ 18
- pnpm ≥ 8

---

## ⚙️ 설치 및 실행

```bash
# pnpm 설치
npm install -g pnpm

# 의존성 설치
pnpm install

# 개발 서버 실행 (Electron + Next.js)
pnpm run electron-dev

# Next.js 빌드
pnpm run build

# Electron 빌드 (배포용)
pnpm run dist
```

## 🛠 기술 스택

- Frontend: Next.js 14, React 18, TypeScript
- UI: Tailwind CSS, shadcn/ui, Lucide React
- Desktop: Electron 27
- Build: electron-builder
- Package Manager: pnpm
