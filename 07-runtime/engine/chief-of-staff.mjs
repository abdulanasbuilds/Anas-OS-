function lines(text) { return String(text ?? '').split(/\r?\n/).map(s => s.trim()).filter(Boolean); }

export function analyzeChiefOfStaff(text) {
  if (!text?.trim()) throw new Error('Notes are required');
  const source = lines(text);
  const matches = pattern => source.filter(line => pattern.test(line));
  const commitments = matches(/\b(I'll|we'll|will|promise|commit|deliver|send|build|finish|follow up)\b/i).map(text => ({ text, confidence: /I'll|we'll|will/i.test(text) ? 0.8 : 0.6 }));
  const blockers = matches(/\b(blocked|blocker|waiting|stuck|cannot|can't|dependency|pending)\b/i);
  const risks = matches(/\b(risk|concern|issue|problem|uncertain|unknown)\b/i);
  const followUps = matches(/\b(follow[- ]?up|next step|action item|check back|revisit)\b/i);
  const missingInputs = matches(/\b(need|missing|required|need to confirm|need info)\b/i);
  return { commitments, blockers, risks, followUps, missingInputs, confidence: source.length ? 0.75 : 0, source: text.trim() };
}
