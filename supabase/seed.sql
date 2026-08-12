-- Wellness Marketplace — seed data
-- Fake/mock data only. Run after schema.sql. Safe to re-run: truncates first.

truncate table referral_events, check_ins, subscriptions, subscribers, tiers, credentials, creators
  restart identity cascade;

-- ---------------------------------------------------------------------
-- Creators
-- ---------------------------------------------------------------------
insert into creators (id, slug, name, niche, tagline, bio, photo_url, scope_of_practice_note) values
  ('11111111-1111-1111-1111-111111111111', 'maya-reyes', 'Maya Reyes', 'Nutrition Coaching',
   'Sustainable eating, not restriction',
   'I spent six years in clinical nutrition before I started coaching — now I help people build eating habits that hold up under a real schedule, not a meal plan you''ll abandon by March. No detoxes, no macros police. Just steady, personal guidance.',
   'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=300&h=300&fit=crop&crop=faces&q=80',
   'Maya provides nutrition coaching and accountability — not medical diagnosis, treatment, or a substitute for your doctor.'),

  ('22222222-2222-2222-2222-222222222222', 'jordan-pike', 'Jordan Pike', 'Strength & Conditioning',
   'Programs built around your actual schedule',
   'Ten years coaching strength athletes and busy people who just want to feel strong. Programs built around your actual schedule, not an ideal one — three days a week, done right, beats seven days you''ll quit on.',
   'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&h=300&fit=crop&crop=faces&q=80',
   'Jordan provides strength and conditioning coaching — not physical therapy or a substitute for medical clearance if you''re returning from injury.'),

  ('33333333-3333-3333-3333-333333333333', 'sam-ortiz', 'Sam Ortiz', 'Mental Health Coaching',
   'Weekly check-ins that hold you accountable',
   'I help people build the kind of consistency that therapy alone sometimes can''t reach — weekly check-ins, honest accountability, and someone in your corner between sessions.',
   'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=300&h=300&fit=crop&crop=faces&q=80',
   'Sam provides coaching and accountability support — not therapy, diagnosis, or crisis care. If you''re in crisis, please contact a licensed provider or emergency services.'),

  ('44444444-4444-4444-4444-444444444444', 'priya-nair', 'Priya Nair', 'Fitness Coaching',
   'Strength training for people who''ve never lifted',
   'Most of my clients walk in intimidated by the weight room and walk out running it. I specialize in first-time lifters — proper form, realistic pacing, and zero judgment.',
   'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=300&h=300&fit=crop&crop=faces&q=80',
   'Priya provides fitness coaching and exercise programming — not physical therapy, medical advice, or injury diagnosis.');

-- ---------------------------------------------------------------------
-- Credentials
-- ---------------------------------------------------------------------
insert into credentials (creator_id, label, full_name, variant, verified) values
  ('11111111-1111-1111-1111-111111111111', 'RD', 'Registered Dietitian', 'verified', true),
  ('11111111-1111-1111-1111-111111111111', 'CNS', 'Certified Nutrition Specialist', 'plum', true),
  ('22222222-2222-2222-2222-222222222222', 'CSCS', 'Certified Strength and Conditioning Specialist', 'verified', true),
  ('33333333-3333-3333-3333-333333333333', 'LPC', 'Licensed Professional Counselor', 'mauve', true),
  ('44444444-4444-4444-4444-444444444444', 'CPT', 'Certified Personal Trainer', 'verified', true);

-- ---------------------------------------------------------------------
-- Tiers
-- ---------------------------------------------------------------------
insert into tiers (creator_id, variant, name, description, price_cents, sort_order) values
  ('11111111-1111-1111-1111-111111111111', 'free', 'Community', 'Weekly public posts, recipe drops', null, 0),
  ('11111111-1111-1111-1111-111111111111', 'paid', '1:1 Coaching', 'Personal check-ins, direct messages, custom guidance', 1900, 1),

  ('22222222-2222-2222-2222-222222222222', 'free', 'Community', 'Weekly programming tips, form breakdowns', null, 0),
  ('22222222-2222-2222-2222-222222222222', 'paid', '1:1 Coaching', 'Custom programming, weekly check-ins, form review', 2500, 1),

  ('33333333-3333-3333-3333-333333333333', 'free', 'Community', 'Weekly reflection prompts, public posts', null, 0),
  ('33333333-3333-3333-3333-333333333333', 'paid', '1:1 Coaching', 'Weekly check-ins, direct messages, accountability plan', 2200, 1),

  ('44444444-4444-4444-4444-444444444444', 'free', 'Community', 'Beginner-friendly workout breakdowns', null, 0),
  ('44444444-4444-4444-4444-444444444444', 'paid', '1:1 Coaching', 'Custom programming, form checks, weekly check-ins', 2000, 1);

-- ---------------------------------------------------------------------
-- Subscribers (one lapsed, for the re-engagement nudge demo)
-- ---------------------------------------------------------------------
insert into subscribers (id, name, email, referral_code, last_active_at) values
  ('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 'Jordan Smith', 'jordan.smith@example.com', 'JORDAN-MAYA', now() - interval '2 days'),
  ('bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', 'Casey Diaz', 'casey.diaz@example.com', 'CASEY-JP', now() - interval '5 days'),
  ('cccccccc-cccc-cccc-cccc-cccccccccccc', 'Riley Chen', 'riley.chen@example.com', 'RILEY-SAM', now() - interval '45 days'); -- lapsed

insert into subscribers (id, name, email, referred_by, referral_code, last_active_at) values
  ('dddddddd-dddd-dddd-dddd-dddddddddddd', 'Avery Brooks', 'avery.brooks@example.com', 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 'AVERY-MAYA', now() - interval '1 day');

-- ---------------------------------------------------------------------
-- Subscriptions
-- ---------------------------------------------------------------------
insert into subscriptions (subscriber_id, creator_id, tier_id, status, start_date)
select 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', '11111111-1111-1111-1111-111111111111', id, 'active', now() - interval '60 days'
from tiers where creator_id = '11111111-1111-1111-1111-111111111111' and variant = 'paid';

insert into subscriptions (subscriber_id, creator_id, tier_id, status, start_date)
select 'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', '22222222-2222-2222-2222-222222222222', id, 'active', now() - interval '30 days'
from tiers where creator_id = '22222222-2222-2222-2222-222222222222' and variant = 'paid';

insert into subscriptions (subscriber_id, creator_id, tier_id, status, start_date)
select 'cccccccc-cccc-cccc-cccc-cccccccccccc', '33333333-3333-3333-3333-333333333333', id, 'active', now() - interval '90 days'
from tiers where creator_id = '33333333-3333-3333-3333-333333333333' and variant = 'paid';

insert into subscriptions (subscriber_id, creator_id, tier_id, status, start_date)
select 'dddddddd-dddd-dddd-dddd-dddddddddddd', '11111111-1111-1111-1111-111111111111', id, 'active', now() - interval '1 day'
from tiers where creator_id = '11111111-1111-1111-1111-111111111111' and variant = 'free';

-- ---------------------------------------------------------------------
-- Check-ins (broadcast updates + one re-engagement nudge to the lapsed subscriber)
-- ---------------------------------------------------------------------
insert into check_ins (creator_id, subscriber_id, message, type, created_at) values
  ('11111111-1111-1111-1111-111111111111', null,
   'A few of you asked about protein timing after evening workouts — posted a short breakdown in the feed. Also, how''d the meal prep go this week? Tell me what stuck and what didn''t, I''ll adjust next week''s plan around it.',
   'update', now() - interval '3 days'),

  ('22222222-2222-2222-2222-222222222222', null,
   'Deload week starting today for everyone on the 12-week block — pull back to 60% and focus on bar speed. Reply if you want the exact numbers, otherwise see you Wednesday.',
   'update', now() - interval '1 day'),

  ('33333333-3333-3333-3333-333333333333', null,
   'Halfway through the week — how''s the sleep tracking going? No judgment either way, just want to know what you''re noticing so far.',
   'update', now() - interval '2 days'),

  ('33333333-3333-3333-3333-333333333333', 'cccccccc-cccc-cccc-cccc-cccccccccccc',
   'Hey Riley — noticed I haven''t heard from you in a few weeks. No pressure at all, just wanted to check in and see how you''re doing. Here whenever you''re ready.',
   'reengagement', now() - interval '1 day');

-- ---------------------------------------------------------------------
-- Referral events
-- ---------------------------------------------------------------------
insert into referral_events (referrer_id, referred_id, creator_id, reward_applied, reward_type) values
  ('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 'dddddddd-dddd-dddd-dddd-dddddddddddd', '11111111-1111-1111-1111-111111111111', false, 'free_month');
