import { useState, type FormEvent } from 'react'
import {
  Trophy,
  DollarSign,
  Briefcase,
  Award,
  UserCheck,
  Crown,
  Calendar,
  X,
} from 'lucide-react'

type TabKey = 'monthly' | 'weekly' | 'realdeal' | 'team'
type Status = '모집 중' | '진행 중' | '완료'
type Difficulty = '기초' | '중급' | '고급'

type Challenge = {
  id: string
  title: string
  desc: string
  prize: string
  participants: number
  difficulty: Difficulty
  deadline: string
  status: Status
  progress?: number
  category: string
  longDesc: string[]
  criteria: { label: string; weight: number }[]
  schedule: { stage: string; date: string }[]
}

const CHALLENGES: Record<TabKey, Challenge[]> = {
  monthly: [
    {
      id: 'm1',
      title: '12월 경매 분석 챌린지',
      desc: '실제 경매 물건 10개를 선정하여 권리분석부터 수익성 예측까지 종합 보고서를 제출하세요.',
      prize: '500만원',
      participants: 156,
      difficulty: '고급',
      deadline: '2026-12-31',
      status: '모집 중',
      progress: 35,
      category: '월별 챌린지',
      longDesc: [
        '12월 한 달간 진행되는 대표 챌린지로, 서울·수도권 주요 법원의 진행 물건 중 10개를 직접 선정합니다.',
        '권리분석, 시세 검증, 명도 난이도, 임차인 보증금 인수 위험까지 종합적으로 평가하고 입찰가를 산정합니다.',
        '제출된 보고서는 현직 경매 전문가 5인의 블라인드 심사를 거쳐 순위가 결정됩니다.',
      ],
      criteria: [
        { label: '권리분석 정확도', weight: 30 },
        { label: '수익률 예측 근거', weight: 30 },
        { label: '리스크 평가 깊이', weight: 20 },
        { label: '보고서 가독성', weight: 20 },
      ],
      schedule: [
        { stage: '신청 마감', date: '2026-11-30' },
        { stage: '챌린지 시작', date: '2026-12-01' },
        { stage: '중간 점검', date: '2026-12-15' },
        { stage: '최종 제출', date: '2026-12-31' },
        { stage: '시상식', date: '2027-01-15' },
      ],
    },
    {
      id: 'm2',
      title: '재개발 후보지 발굴 챌린지',
      desc: 'AI 기반 데이터 분석으로 향후 5년 내 재개발 가능성이 높은 후보지를 발굴합니다.',
      prize: '300만원',
      participants: 89,
      difficulty: '중급',
      deadline: '2026-01-15',
      status: '진행 중',
      progress: 62,
      category: '월별 챌린지',
      longDesc: [
        '노후도, 용적률 여유, 인구 밀도, 주민 동의율 추정치 등 다양한 지표를 활용해 후보지를 선정합니다.',
        '실제 정비구역 후보 발표와 비교하여 적중률에 따라 가산점이 부여됩니다.',
        '상위 입상자에게는 실제 정비업체 컨설팅 프로젝트 참여 기회가 제공됩니다.',
      ],
      criteria: [
        { label: '데이터 활용 다양성', weight: 25 },
        { label: '예측 적중률', weight: 35 },
        { label: '분석 방법론', weight: 25 },
        { label: '시각화 품질', weight: 15 },
      ],
      schedule: [
        { stage: '챌린지 시작', date: '2025-12-15' },
        { stage: '중간 점검', date: '2025-12-30' },
        { stage: '최종 제출', date: '2026-01-15' },
        { stage: '시상식', date: '2026-01-25' },
      ],
    },
    {
      id: 'm3',
      title: '토지 개발 사업성 분석',
      desc: '농지·산지·관리지역의 개발 가능성과 수익성을 종합 평가합니다.',
      prize: '800만원',
      participants: 23,
      difficulty: '고급',
      deadline: '2026-02-28',
      status: '모집 중',
      progress: 10,
      category: '월별 챌린지',
      longDesc: [
        '용도지역 전환 가능성, 인허가 난이도, 개발 비용, 시장 수요까지 종합적으로 분석합니다.',
        '실제 개발 가능한 토지 5필지를 선정하여 사업성 검토 보고서를 작성합니다.',
        '우수 보고서는 실제 개발 시행사에 검토 자료로 전달되며, 채택 시 추가 보상이 지급됩니다.',
      ],
      criteria: [
        { label: '인허가 분석 깊이', weight: 30 },
        { label: '재무 모델링 정확도', weight: 30 },
        { label: '시장 조사 완성도', weight: 20 },
        { label: '리스크 시나리오', weight: 20 },
      ],
      schedule: [
        { stage: '신청 마감', date: '2026-01-31' },
        { stage: '챌린지 시작', date: '2026-02-01' },
        { stage: '중간 점검', date: '2026-02-15' },
        { stage: '최종 제출', date: '2026-02-28' },
        { stage: '시상식', date: '2026-03-15' },
      ],
    },
    {
      id: 'm4',
      title: '시장 트렌드 예측 챌린지',
      desc: '2026년 1분기 부동산 시장 가격 흐름과 거래량을 예측해보세요.',
      prize: '200만원',
      participants: 234,
      difficulty: '기초',
      deadline: '2025-11-30',
      status: '완료',
      progress: 100,
      category: '월별 챌린지',
      longDesc: [
        '서울 25개 자치구 아파트 매매가 변동률을 예측하는 단순 명료한 챌린지입니다.',
        '예측치와 실제 거래 데이터를 비교하여 평균 오차가 가장 적은 참가자가 우승합니다.',
        '입문자 친화적이며, 사용한 모델·근거 데이터를 함께 제출합니다.',
      ],
      criteria: [
        { label: '예측 정확도', weight: 60 },
        { label: '모델 설명력', weight: 20 },
        { label: '데이터 출처', weight: 20 },
      ],
      schedule: [
        { stage: '챌린지 시작', date: '2025-11-01' },
        { stage: '최종 제출', date: '2025-11-30' },
        { stage: '시상식', date: '2025-12-10' },
      ],
    },
  ],
  weekly: [
    {
      id: 'w1',
      title: '주간 시장 분석',
      desc: '한 주간의 부동산 뉴스와 거래 데이터를 5장 인포그래픽으로 정리',
      prize: '30만원',
      participants: 78,
      difficulty: '기초',
      deadline: '2026-05-19',
      status: '진행 중',
      progress: 70,
      category: '주별 챌린지',
      longDesc: [
        '매주 월요일에 시작하여 일요일 자정에 마감되는 가벼운 챌린지입니다.',
        '주요 뉴스, 거래량 변동, 정책 변화를 한 장에 압축해 시각화합니다.',
        '꾸준히 참여한 상위 4주 누적 점수로 월말 보너스가 지급됩니다.',
      ],
      criteria: [
        { label: '데이터 정확성', weight: 30 },
        { label: '시각화 가독성', weight: 40 },
        { label: '인사이트 깊이', weight: 30 },
      ],
      schedule: [
        { stage: '챌린지 시작', date: '2026-05-13' },
        { stage: '최종 제출', date: '2026-05-19' },
        { stage: '결과 발표', date: '2026-05-21' },
      ],
    },
    {
      id: 'w2',
      title: 'AI 도구 활용 미션',
      desc: 'ChatGPT·Claude 등 LLM으로 부동산 분석 워크플로우 구축',
      prize: '50만원',
      participants: 102,
      difficulty: '중급',
      deadline: '2026-05-19',
      status: '진행 중',
      progress: 55,
      category: '주별 챌린지',
      longDesc: [
        '본인의 LLM 프롬프트와 자동화 스크립트를 공개·시연합니다.',
        '실제 시간 단축·정확도 향상 효과를 정량적으로 측정해 제출합니다.',
        '재현 가능한 워크플로우일수록 높은 점수를 받습니다.',
      ],
      criteria: [
        { label: '프롬프트 설계', weight: 30 },
        { label: '자동화 깊이', weight: 30 },
        { label: '재현성', weight: 20 },
        { label: '효율 향상치', weight: 20 },
      ],
      schedule: [
        { stage: '챌린지 시작', date: '2026-05-13' },
        { stage: '최종 제출', date: '2026-05-19' },
        { stage: '결과 발표', date: '2026-05-22' },
      ],
    },
    {
      id: 'w3',
      title: '경매 물건 분석',
      desc: '주간 신규 경매 물건 1건을 깊이 있게 해부',
      prize: '40만원',
      participants: 67,
      difficulty: '중급',
      deadline: '2026-05-19',
      status: '모집 중',
      progress: 20,
      category: '주별 챌린지',
      longDesc: [
        '운영진이 매주 화요일 공개하는 경매 물건 1건을 분석합니다.',
        '권리관계, 임차인 현황, 명도 난이도, 적정 입찰가를 산정합니다.',
        '실제 낙찰가와 가장 근접한 참가자에게 추가 보너스가 지급됩니다.',
      ],
      criteria: [
        { label: '권리분석', weight: 35 },
        { label: '시세 분석', weight: 25 },
        { label: '입찰가 정확성', weight: 40 },
      ],
      schedule: [
        { stage: '물건 공개', date: '2026-05-13' },
        { stage: '제출 마감', date: '2026-05-19' },
        { stage: '낙찰일 비교', date: '2026-05-25' },
      ],
    },
    {
      id: 'w4',
      title: '데이터 수집 자동화',
      desc: '공공데이터·국토부 API로 자동 수집 파이프라인 구축',
      prize: '60만원',
      participants: 45,
      difficulty: '고급',
      deadline: '2026-05-26',
      status: '모집 중',
      progress: 10,
      category: '주별 챌린지',
      longDesc: [
        '국토교통부 실거래가, KOSIS, 공시지가 API를 결합한 수집 스크립트를 작성합니다.',
        '자동 스케줄링과 데이터 검증 로직 포함 여부를 평가합니다.',
        '소스 코드는 깃허브에 오픈소스로 공개해야 합니다.',
      ],
      criteria: [
        { label: '코드 품질', weight: 30 },
        { label: '자동화 완성도', weight: 30 },
        { label: '데이터 정합성', weight: 20 },
        { label: '문서화', weight: 20 },
      ],
      schedule: [
        { stage: '챌린지 시작', date: '2026-05-20' },
        { stage: '최종 제출', date: '2026-05-26' },
        { stage: '결과 발표', date: '2026-05-29' },
      ],
    },
    {
      id: 'w5',
      title: '투자 계산기 개발',
      desc: '취득세·중개수수료·대출이자까지 반영한 수익률 계산기',
      prize: '50만원',
      participants: 39,
      difficulty: '중급',
      deadline: '2026-05-26',
      status: '모집 중',
      progress: 5,
      category: '주별 챌린지',
      longDesc: [
        'IRR, NPV, 레버리지 효과까지 산출하는 웹 기반 계산기를 만듭니다.',
        '입력 폼 UX와 결과 시각화 품질도 함께 평가됩니다.',
        '모바일 친화적 반응형 디자인이 가산점입니다.',
      ],
      criteria: [
        { label: '계산 정확도', weight: 30 },
        { label: 'UX 디자인', weight: 30 },
        { label: '기능 다양성', weight: 20 },
        { label: '코드 가독성', weight: 20 },
      ],
      schedule: [
        { stage: '챌린지 시작', date: '2026-05-20' },
        { stage: '최종 제출', date: '2026-05-26' },
        { stage: '결과 발표', date: '2026-05-30' },
      ],
    },
    {
      id: 'w6',
      title: '지역 분석 리포트',
      desc: '특정 동 단위 지역의 가격·인프라·미래 가치 분석',
      prize: '40만원',
      participants: 56,
      difficulty: '기초',
      deadline: '2026-05-26',
      status: '모집 중',
      progress: 15,
      category: '주별 챌린지',
      longDesc: [
        '본인이 잘 아는 동 1곳을 선정해 깊이 있는 리포트를 작성합니다.',
        '교통·교육·상권·정비사업 4개 카테고리별 점수를 매깁니다.',
        '커뮤니티 추천 수도 점수에 반영됩니다.',
      ],
      criteria: [
        { label: '현장감', weight: 30 },
        { label: '데이터 활용', weight: 30 },
        { label: '커뮤니티 추천', weight: 40 },
      ],
      schedule: [
        { stage: '챌린지 시작', date: '2026-05-20' },
        { stage: '최종 제출', date: '2026-05-26' },
        { stage: '결과 발표', date: '2026-05-30' },
      ],
    },
  ],
  realdeal: [
    {
      id: 'r1',
      title: '실제 경매 챌린지',
      desc: '한도 2억원 이내의 실제 경매 입찰까지 진행하는 본격 실전',
      prize: '낙찰가 2억원 한도',
      participants: 18,
      difficulty: '고급',
      deadline: '2026-06-30',
      status: '모집 중',
      progress: 25,
      category: '실전투자 챌린지',
      longDesc: [
        '개인이 단독으로 또는 팀으로 실제 경매에 참여합니다. 입찰 보증금은 본인 부담입니다.',
        '운영진은 권리분석 멘토링과 실패 시나리오 검토를 지원합니다.',
        '최종 수익률 상위 3팀에 운영진의 공동 투자 매칭이 제공됩니다.',
      ],
      criteria: [
        { label: '실제 수익률', weight: 50 },
        { label: '리스크 관리', weight: 25 },
        { label: '실행 속도', weight: 25 },
      ],
      schedule: [
        { stage: '신청 마감', date: '2026-05-31' },
        { stage: '오리엔테이션', date: '2026-06-05' },
        { stage: '실전 진행', date: '2026-06-06' },
        { stage: '결과 정산', date: '2026-06-30' },
      ],
    },
    {
      id: 'r2',
      title: '재개발 펀드 챌린지',
      desc: '50억원 규모 펀드의 후보지 추천·운용 시뮬레이션',
      prize: '50억원 규모',
      participants: 32,
      difficulty: '고급',
      deadline: '2026-09-30',
      status: '진행 중',
      progress: 40,
      category: '실전투자 챌린지',
      longDesc: [
        '실제 운용사가 검토하는 50억원 규모 펀드의 가상 운용을 경험합니다.',
        '5개 후보 정비구역 중 자산 배분과 청산 전략을 제안합니다.',
        '상위 입상자는 운용사 인턴 기회와 함께 정식 채용 면접권이 부여됩니다.',
      ],
      criteria: [
        { label: '포트폴리오 설계', weight: 30 },
        { label: '시뮬레이션 수익률', weight: 30 },
        { label: '리스크 헤지 전략', weight: 20 },
        { label: '발표력', weight: 20 },
      ],
      schedule: [
        { stage: '신청 마감', date: '2026-04-30' },
        { stage: '챌린지 시작', date: '2026-05-01' },
        { stage: '중간 발표', date: '2026-07-15' },
        { stage: '최종 제출', date: '2026-09-30' },
        { stage: '시상식', date: '2026-10-15' },
      ],
    },
    {
      id: 'r3',
      title: '토지 개발 100억 프로젝트',
      desc: '실제 100억원 규모 개발 사업의 자문단 모집',
      prize: '100억원 프로젝트',
      participants: 12,
      difficulty: '고급',
      deadline: '2026-08-31',
      status: '모집 중',
      progress: 5,
      category: '실전투자 챌린지',
      longDesc: [
        '경기도 외곽 30,000평 부지를 활용한 100억원 규모 개발 프로젝트의 자문단을 모집합니다.',
        '인허가, 마스터플랜, 분양 전략, 출구 전략을 종합적으로 제안합니다.',
        '채택된 자문 의견에는 사업 지분 또는 성공 보수가 지급됩니다.',
      ],
      criteria: [
        { label: '인허가 전략', weight: 25 },
        { label: '마스터플랜 완성도', weight: 25 },
        { label: '재무 타당성', weight: 25 },
        { label: '실행 가능성', weight: 25 },
      ],
      schedule: [
        { stage: '신청 마감', date: '2026-06-30' },
        { stage: '서류 심사', date: '2026-07-15' },
        { stage: '면접', date: '2026-07-31' },
        { stage: '자문 시작', date: '2026-08-15' },
        { stage: '최종 보고', date: '2026-08-31' },
      ],
    },
    {
      id: 'r4',
      title: 'AI 알고리즘 대회',
      desc: '실거래가 예측 모델의 RMSE 성능을 겨루는 캐글 스타일 대회',
      prize: '1,000만원',
      participants: 145,
      difficulty: '고급',
      deadline: '2026-07-31',
      status: '진행 중',
      progress: 50,
      category: '실전투자 챌린지',
      longDesc: [
        '서울 25개 자치구의 향후 6개월 실거래가를 예측하는 회귀 문제입니다.',
        '실시간 리더보드가 운영되며, 매주 모델 성능이 갱신됩니다.',
        '상위 10팀은 모델 코드와 함께 발표를 진행합니다.',
      ],
      criteria: [
        { label: 'RMSE 성능', weight: 60 },
        { label: '모델 일반화', weight: 20 },
        { label: '코드 재현성', weight: 20 },
      ],
      schedule: [
        { stage: '챌린지 시작', date: '2026-04-01' },
        { stage: '중간 리더보드', date: '2026-06-01' },
        { stage: '최종 제출', date: '2026-07-31' },
        { stage: '발표·시상', date: '2026-08-15' },
      ],
    },
  ],
  team: [
    {
      id: 't1',
      title: '지역별 분석 팀 챌린지',
      desc: '5인 1팀으로 권역별 부동산 시장 종합 보고서 작성',
      prize: '500만원',
      participants: 85,
      difficulty: '중급',
      deadline: '2026-06-30',
      status: '모집 중',
      progress: 20,
      category: '팀 프로젝트 챌린지',
      longDesc: [
        '수도권·충청·영남·호남 4개 권역 중 1곳을 선택해 5인 팀으로 보고서를 작성합니다.',
        '팀 내 역할 분담(데이터·시각화·작성·발표)도 평가 대상입니다.',
        '지자체에 실제 정책 제안 형태로 제출되며 채택 시 추가 인센티브가 있습니다.',
      ],
      criteria: [
        { label: '보고서 완성도', weight: 30 },
        { label: '팀워크', weight: 25 },
        { label: '데이터 깊이', weight: 25 },
        { label: '발표력', weight: 20 },
      ],
      schedule: [
        { stage: '팀 구성 마감', date: '2026-05-31' },
        { stage: '챌린지 시작', date: '2026-06-01' },
        { stage: '중간 점검', date: '2026-06-20' },
        { stage: '최종 제출', date: '2026-06-30' },
      ],
    },
    {
      id: 't2',
      title: 'AI 도구 해커톤',
      desc: '48시간 동안 부동산 AI 서비스 프로토타입 개발',
      prize: '700만원',
      participants: 64,
      difficulty: '고급',
      deadline: '2026-07-15',
      status: '모집 중',
      progress: 10,
      category: '팀 프로젝트 챌린지',
      longDesc: [
        '금요일 저녁부터 일요일 저녁까지 48시간 동안 진행되는 무박 해커톤입니다.',
        '4인 1팀으로 동일한 데이터셋과 API를 받아 새로운 서비스를 만듭니다.',
        '결과물은 즉시 시연되며 사용자 투표와 심사위원 점수를 합산합니다.',
      ],
      criteria: [
        { label: '아이디어 참신성', weight: 25 },
        { label: '기술 완성도', weight: 30 },
        { label: 'UX/시연', weight: 25 },
        { label: '확장 가능성', weight: 20 },
      ],
      schedule: [
        { stage: '신청 마감', date: '2026-06-30' },
        { stage: '해커톤 시작', date: '2026-07-13' },
        { stage: '최종 제출', date: '2026-07-15' },
        { stage: '시상식', date: '2026-07-15' },
      ],
    },
    {
      id: 't3',
      title: '투자 전략 발표 대회',
      desc: '5,000만원 가상 자본을 활용한 투자 전략 발표',
      prize: '300만원',
      participants: 42,
      difficulty: '중급',
      deadline: '2026-06-15',
      status: '모집 중',
      progress: 15,
      category: '팀 프로젝트 챌린지',
      longDesc: [
        '3인 1팀으로 5,000만원 가상 자본의 1년 운용 전략을 발표합니다.',
        '전세 레버리지·경매·재개발 등 자유롭게 결합 가능합니다.',
        '심사위원 30%, 청중 투표 70%로 순위가 결정됩니다.',
      ],
      criteria: [
        { label: '전략의 정합성', weight: 30 },
        { label: '리스크 관리', weight: 25 },
        { label: '발표력', weight: 25 },
        { label: '청중 호응도', weight: 20 },
      ],
      schedule: [
        { stage: '팀 구성', date: '2026-05-15' },
        { stage: '예선 제출', date: '2026-06-05' },
        { stage: '본선 발표', date: '2026-06-15' },
      ],
    },
    {
      id: 't4',
      title: '빅데이터 분석 챌린지',
      desc: '1억건 거래 데이터에서 시장 신호를 발굴',
      prize: '600만원',
      participants: 38,
      difficulty: '고급',
      deadline: '2026-08-15',
      status: '진행 중',
      progress: 45,
      category: '팀 프로젝트 챌린지',
      longDesc: [
        '2010년 이후 전국 실거래가 1억건 가량의 빅데이터에서 의미 있는 시장 신호를 발굴합니다.',
        '4인 1팀으로 가설·분석·시각화·결론까지 한 편의 논문 형태로 제출합니다.',
        '우수 결과물은 학술 컨퍼런스 발표 기회를 제공합니다.',
      ],
      criteria: [
        { label: '가설의 독창성', weight: 25 },
        { label: '분석 방법론', weight: 30 },
        { label: '결론의 설득력', weight: 25 },
        { label: '시각화', weight: 20 },
      ],
      schedule: [
        { stage: '챌린지 시작', date: '2026-06-01' },
        { stage: '중간 발표', date: '2026-07-15' },
        { stage: '최종 제출', date: '2026-08-15' },
        { stage: '시상식', date: '2026-08-30' },
      ],
    },
  ],
}

const TABS: { key: TabKey; label: string }[] = [
  { key: 'monthly', label: '월별 챌린지' },
  { key: 'weekly', label: '주별 챌린지' },
  { key: 'realdeal', label: '실전투자 챌린지' },
  { key: 'team', label: '팀 프로젝트 챌린지' },
]

const statusColor: Record<Status, string> = {
  '모집 중': 'bg-blue-100 text-blue-700',
  '진행 중': 'bg-green-100 text-green-700',
  '완료': 'bg-slate-100 text-slate-600',
}

const difficultyDot: Record<Difficulty, string> = {
  기초: 'bg-emerald-500',
  중급: 'bg-amber-500',
  고급: 'bg-rose-500',
}

type LeaderRow = { rank: number; name: string; sub: string; points: number; delta: number }

const LEADER_AUCTION: LeaderRow[] = [
  { rank: 1, name: '박투자', sub: '경매 분석가 · LV.7', points: 9820, delta: 240 },
  { rank: 2, name: '이수익', sub: '실전 투자자 · LV.6', points: 9510, delta: 180 },
  { rank: 3, name: '최감정', sub: '권리분석 전문가 · LV.6', points: 9215, delta: 160 },
  { rank: 4, name: '김부동산', sub: 'AI 데이터 분석 · LV.5', points: 8870, delta: 95 },
  { rank: 5, name: '한낙찰', sub: '실거주 투자 · LV.5', points: 8520, delta: 60 },
]

const LEADER_REDEV: LeaderRow[] = [
  { rank: 1, name: '정도시', sub: '도시계획 컨설턴트 · LV.7', points: 8760, delta: 310 },
  { rank: 2, name: '윤재개발', sub: '정비사업 자문 · LV.6', points: 8430, delta: 220 },
  { rank: 3, name: '오기획', sub: 'AI 데이터 분석 · LV.6', points: 8210, delta: 195 },
  { rank: 4, name: '강노후', sub: '주민 동의 컨설팅 · LV.5', points: 7980, delta: 140 },
  { rank: 5, name: '송실거주', sub: '입지 분석가 · LV.5', points: 7720, delta: 80 },
]

const REWARDS = [
  { icon: DollarSign, title: '현금 상금', desc: '챌린지별 최대 1,000만원 현금 보상과 누적 시즌 보너스' },
  { icon: Briefcase, title: '투자 기회', desc: '실제 펀드·개발 프로젝트 우선 참여권과 공동 투자 매칭' },
  { icon: UserCheck, title: '1:1 멘토링', desc: '현직 자산운용사·정비사업 임원의 6주 집중 멘토링' },
  { icon: Award, title: '인증서', desc: 'AI 부동산 분석가 공식 인증서와 디지털 배지 발급' },
]

const STATS_BOTTOM = [
  { v: '12,840', l: '누적 참여 건수' },
  { v: '2.3억원', l: '올해 지급된 상금' },
  { v: '47명', l: '실투자 매칭 성공' },
  { v: '4.8 / 5.0', l: '참여자 만족도' },
]

export default function Challenge() {
  const [tab, setTab] = useState<TabKey>('monthly')
  const [selected, setSelected] = useState<Challenge | null>(null)
  const [submitted, setSubmitted] = useState(false)

  const list = CHALLENGES[tab]

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setSubmitted(true)
    setTimeout(() => {
      setSelected(null)
      setSubmitted(false)
    }, 1500)
  }

  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-br from-blue-50 via-slate-50 to-blue-100 py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <span className="inline-block bg-primary text-white text-sm font-semibold px-4 py-2 rounded-full mb-6">
            실력을 검증하고 보상을 받으세요
          </span>
          <h1 className="text-4xl lg:text-6xl font-bold text-slate-900 mb-6">
            실전 투자 능력을<br />
            <span className="accent-text">검증하는 챌린지</span>
          </h1>
          <p className="text-lg lg:text-xl text-slate-600 max-w-3xl mx-auto">
            AI 부동산 분석 실력을 겨루고, 실제 투자 기회와 멘토링을 얻을 수 있는 다양한 챌린지에 참여해보세요
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto mt-12">
            {[
              { v: '1,247명', l: '참여자 수' },
              { v: '15개', l: '진행 중 챌린지' },
              { v: '5,000만원', l: '총 상금 규모' },
              { v: '89%', l: '완주율' },
            ].map(s => (
              <div key={s.l} className="bg-white/80 rounded-lg p-6">
                <div className="text-2xl font-bold text-primary mb-2">{s.v}</div>
                <div className="text-slate-600 text-sm">{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Category tabs */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 text-center mb-4">
            카테고리별 챌린지
          </h2>
          <p className="text-slate-600 text-center mb-10">목표와 일정에 맞는 챌린지를 골라 참여해보세요</p>

          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {TABS.map(t => (
              <button
                key={t.key}
                onClick={() => setTab(t.key)}
                className={`px-6 py-3 rounded-button font-semibold transition ${
                  tab === t.key
                    ? 'bg-primary text-white shadow-md'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>

          <div
            className={`grid gap-6 ${
              tab === 'monthly' ? 'lg:grid-cols-2' : tab === 'weekly' ? 'md:grid-cols-2 lg:grid-cols-3' : 'md:grid-cols-2'
            }`}
          >
            {list.map(c => (
              <div
                key={c.id}
                className={`glass-card rounded-2xl p-6 lg:p-8 ${
                  tab === 'realdeal' ? 'border-2 border-primary/40' : ''
                }`}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 lg:w-14 lg:h-14 bg-primary/10 rounded-2xl flex items-center justify-center">
                    <Trophy className="text-primary" size={tab === 'weekly' ? 22 : 28} />
                  </div>
                  <span
                    className={`text-xs font-semibold px-3 py-1 rounded-full ${statusColor[c.status]}`}
                  >
                    {c.status}
                  </span>
                </div>

                <h3 className="text-lg lg:text-xl font-bold text-slate-900 mb-2">{c.title}</h3>
                <p className="text-slate-600 text-sm lg:text-base mb-5 leading-relaxed">{c.desc}</p>

                <div className="grid grid-cols-2 gap-3 mb-5">
                  <div className="bg-slate-50 rounded-lg p-3 text-center">
                    <div className="text-base lg:text-lg font-bold text-slate-900">{c.prize}</div>
                    <div className="text-xs text-slate-600">1등 상금</div>
                  </div>
                  <div className="bg-slate-50 rounded-lg p-3 text-center">
                    <div className="text-base lg:text-lg font-bold text-slate-900">{c.participants}명</div>
                    <div className="text-xs text-slate-600">참여자</div>
                  </div>
                </div>

                <div className="flex items-center justify-between text-sm text-slate-600 mb-3">
                  <span className="inline-flex items-center gap-2">
                    <span className={`w-2.5 h-2.5 rounded-full ${difficultyDot[c.difficulty]}`} />
                    난이도 <span className="font-semibold text-slate-900">{c.difficulty}</span>
                  </span>
                  <span className="inline-flex items-center gap-1">
                    <Calendar size={14} />
                    {c.deadline}
                  </span>
                </div>

                {typeof c.progress === 'number' && (
                  <div className="mb-5">
                    <div className="flex justify-between text-xs text-slate-500 mb-1">
                      <span>진행률</span>
                      <span>{c.progress}%</span>
                    </div>
                    <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-primary to-secondary rounded-full"
                        style={{ width: `${c.progress}%` }}
                      />
                    </div>
                  </div>
                )}

                <button
                  disabled={c.status === '완료'}
                  onClick={() => setSelected(c)}
                  className={`w-full py-3 rounded-button font-semibold transition ${
                    c.status === '완료'
                      ? 'bg-slate-200 text-slate-500 cursor-not-allowed'
                      : 'bg-primary hover:bg-secondary text-white'
                  }`}
                >
                  {c.status === '완료' ? '종료된 챌린지' : '참여하기'}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Realtime leaderboard */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-4">
              실시간 리더보드
            </h2>
            <p className="text-slate-600">대표 챌린지의 상위 5인 순위를 실시간으로 확인하세요</p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {[
              { title: '12월 경매 분석 챌린지', rows: LEADER_AUCTION },
              { title: '재개발 후보지 발굴 챌린지', rows: LEADER_REDEV },
            ].map(board => (
              <div key={board.title} className="bg-white rounded-2xl p-6 lg:p-8 shadow-sm">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-bold text-slate-900">{board.title}</h3>
                  <span className="text-xs bg-primary/10 text-primary font-semibold px-3 py-1 rounded-full">
                    LIVE
                  </span>
                </div>
                <ul className="space-y-3">
                  {board.rows.map(r => {
                    const medal =
                      r.rank === 1
                        ? 'bg-gradient-to-br from-yellow-400 to-amber-500 text-white'
                        : r.rank === 2
                          ? 'bg-gradient-to-br from-slate-300 to-slate-400 text-white'
                          : r.rank === 3
                            ? 'bg-gradient-to-br from-orange-400 to-orange-600 text-white'
                            : 'bg-slate-100 text-slate-600'
                    return (
                      <li
                        key={r.rank}
                        className="flex items-center gap-4 p-3 rounded-xl hover:bg-slate-50 transition"
                      >
                        <div
                          className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${medal}`}
                        >
                          {r.rank}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="font-semibold text-slate-900 truncate">{r.name}</div>
                          <div className="text-xs text-slate-500 truncate">{r.sub}</div>
                        </div>
                        <div className="text-right">
                          <div className="font-bold text-slate-900">{r.points.toLocaleString()}P</div>
                          <div className="text-xs text-emerald-600 font-semibold">+{r.delta}</div>
                        </div>
                      </li>
                    )
                  })}
                </ul>
                <div className="mt-6 text-center">
                  <a
                    href="#"
                    className="text-primary font-semibold text-sm hover:underline inline-flex items-center gap-1"
                  >
                    전체 순위 보기 →
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Reward system */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-4">보상 시스템</h2>
            <p className="text-slate-600">챌린지 참여로 받을 수 있는 4가지 핵심 보상</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {REWARDS.map(r => (
              <div
                key={r.title}
                className="bg-slate-50 hover:bg-white hover:shadow-lg transition rounded-2xl p-6 text-center border border-slate-100"
              >
                <div className="w-14 h-14 bg-gradient-to-br from-primary to-secondary rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <r.icon className="text-white" size={26} />
                </div>
                <h3 className="font-bold text-slate-900 mb-2 text-lg">{r.title}</h3>
                <p className="text-sm text-slate-600 leading-relaxed">{r.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats + outcomes */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-4">참여 통계 · 성과</h2>
            <p className="text-slate-600">지난 12개월 동안 챌린지가 만들어낸 변화</p>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {STATS_BOTTOM.map(s => (
              <div
                key={s.l}
                className="bg-white rounded-2xl p-8 text-center border border-slate-100 shadow-sm"
              >
                <div className="text-3xl lg:text-4xl font-bold accent-text mb-2">{s.v}</div>
                <div className="text-slate-600 text-sm">{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-br from-primary via-secondary to-primary text-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <Crown className="mx-auto mb-6 text-yellow-300" size={48} />
          <h2 className="text-3xl lg:text-5xl font-bold mb-6">
            지금 챌린지에 도전하고<br />
            실력과 보상을 모두 잡으세요
          </h2>
          <p className="text-lg lg:text-xl text-white/90 mb-8">
            매월 새로운 챌린지가 열리며, 누구나 무료로 참여할 수 있습니다
          </p>
          <button
            onClick={() => setTab('monthly')}
            className="bg-white text-primary px-8 py-4 rounded-button font-bold text-lg hover:bg-slate-100 transition"
          >
            진행 중 챌린지 보기
          </button>
        </div>
      </section>

      {/* Modal */}
      {selected && (
        <div
          className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setSelected(null)}
        >
          <div
            className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            onClick={e => e.stopPropagation()}
          >
            <div className="sticky top-0 bg-white border-b px-6 lg:px-8 py-5 flex items-start justify-between rounded-t-2xl">
              <div className="pr-4">
                <div className="flex items-center gap-2 mb-2 flex-wrap">
                  <span className="text-xs bg-primary/10 text-primary font-semibold px-3 py-1 rounded-full">
                    {selected.category}
                  </span>
                  <span
                    className={`text-xs font-semibold px-3 py-1 rounded-full ${statusColor[selected.status]}`}
                  >
                    {selected.status}
                  </span>
                  <span className="text-xs bg-amber-100 text-amber-700 font-semibold px-3 py-1 rounded-full">
                    상금 {selected.prize}
                  </span>
                </div>
                <h3 className="text-xl lg:text-2xl font-bold text-slate-900">{selected.title}</h3>
              </div>
              <button
                onClick={() => setSelected(null)}
                className="text-slate-400 hover:text-slate-700 transition"
                aria-label="닫기"
              >
                <X size={24} />
              </button>
            </div>

            <div className="px-6 lg:px-8 py-6 space-y-8">
              {submitted ? (
                <div className="text-center py-12">
                  <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Trophy className="text-emerald-600" size={32} />
                  </div>
                  <h4 className="text-xl font-bold text-slate-900 mb-2">신청이 접수되었습니다</h4>
                  <p className="text-slate-600">곧 등록한 이메일로 안내가 전송됩니다.</p>
                </div>
              ) : (
                <>
                  <div>
                    <h4 className="text-base font-bold text-slate-900 mb-3">챌린지 상세 설명</h4>
                    <div className="space-y-3 text-slate-600 text-sm leading-relaxed">
                      {selected.longDesc.map((p, i) => (
                        <p key={i}>{p}</p>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="text-base font-bold text-slate-900 mb-3">평가 기준</h4>
                    <ul className="space-y-3">
                      {selected.criteria.map(c => (
                        <li key={c.label}>
                          <div className="flex justify-between text-sm mb-1">
                            <span className="text-slate-700">{c.label}</span>
                            <span className="font-semibold text-slate-900">{c.weight}%</span>
                          </div>
                          <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-gradient-to-r from-primary to-secondary rounded-full"
                              style={{ width: `${c.weight}%` }}
                            />
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className="text-base font-bold text-slate-900 mb-3">진행 일정</h4>
                    <ol className="relative border-l-2 border-primary/20 ml-2 space-y-4">
                      {selected.schedule.map(s => (
                        <li key={s.stage} className="pl-5 relative">
                          <span className="absolute -left-[7px] top-1 w-3 h-3 rounded-full bg-primary" />
                          <div className="flex justify-between text-sm">
                            <span className="font-semibold text-slate-900">{s.stage}</span>
                            <span className="text-slate-500">{s.date}</span>
                          </div>
                        </li>
                      ))}
                    </ol>
                  </div>

                  <form onSubmit={onSubmit} className="space-y-4 border-t pt-6">
                    <h4 className="text-base font-bold text-slate-900">참가 신청</h4>
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-1">이름</label>
                      <input
                        required
                        type="text"
                        placeholder="홍길동"
                        className="w-full px-4 py-2.5 rounded-button border-2 border-slate-200 focus:border-primary focus:outline-none text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-1">이메일</label>
                      <input
                        required
                        type="email"
                        placeholder="you@example.com"
                        className="w-full px-4 py-2.5 rounded-button border-2 border-slate-200 focus:border-primary focus:outline-none text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-1">참여 동기</label>
                      <textarea
                        required
                        rows={3}
                        placeholder="이 챌린지에 참여하고 싶은 이유를 간단히 작성해주세요"
                        className="w-full px-4 py-2.5 rounded-button border-2 border-slate-200 focus:border-primary focus:outline-none text-sm resize-none"
                      />
                    </div>
                    <div className="flex gap-3 pt-2">
                      <button
                        type="button"
                        onClick={() => setSelected(null)}
                        className="flex-1 py-3 rounded-button font-semibold border-2 border-slate-200 text-slate-700 hover:bg-slate-50 transition"
                      >
                        취소
                      </button>
                      <button
                        type="submit"
                        className="flex-1 py-3 rounded-button font-semibold bg-primary hover:bg-secondary text-white transition"
                      >
                        신청하기
                      </button>
                    </div>
                  </form>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  )
}
