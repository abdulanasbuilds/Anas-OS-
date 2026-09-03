export const STAGES = Object.freeze(['discover','validate','define','build','verify','release','operate','measure','learn']);
const NEXT = new Map(STAGES.map((stage, index) => [stage, STAGES[index + 1]]));
NEXT.set('learn', 'discover');

export function canTransition(from, to) { return NEXT.get(from) === to; }
export function assertTransition(from, to) { if (!canTransition(from, to)) throw new Error(`Illegal lifecycle transition: ${from} -> ${to}`); return true; }
export function transitionState(state, to, { gatePassed = false, actorId } = {}) {
  if (!state?.stage || !actorId) throw new Error('State transition requires current stage and actor');
  assertTransition(state.stage, to);
  if (!gatePassed) throw new Error(`Gate evidence required before transition ${state.stage} -> ${to}`);
  return { ...state, stage: to, updatedAt: new Date().toISOString(), updatedBy: actorId };
}
