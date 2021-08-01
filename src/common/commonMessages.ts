import { CommonOutput } from './dtos/common.dto';

export const responses = {
  commonCatch: {
    ok: false,
    error: '알수없는 오류가 발생했습니다 관리자에게 문의하세요.',
  },
  commonTrue: {
    ok: true,
  },
  commonExist: (name) => ({
    ok: false,
    error: `이미 존재하는 ${name}입니다.`,
  }),
  commonToken: {
    ok: false,
    error: '로그인하세요',
  },
  wrondPassword: {
    ok: false,
    error: '아아디나 비밀번호가 틀렸습니다.',
  },

  askUpdate: {
    ok: true,
    error: '이미 가입된 아이디 입니다. 비밀번호를 업데이트 하시겠습니까?',
  },
  commonNotFound: (data: string) => ({
    ok: false,
    error: `찾을수 없는 ${data}입니다.`,
  }),
};
