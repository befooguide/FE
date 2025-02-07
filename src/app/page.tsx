import { redirect } from 'next/navigation';

export default function Start() {
  // '/' 경로에 접근 시 '/landing'로 리다이렉트
	redirect('/landing');
}
