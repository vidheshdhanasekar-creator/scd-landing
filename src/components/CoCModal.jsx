import { eventData } from '../models/eventData';

export default function CoCModal({ open, onClose }) {
  if (!open) return null;

  const sections = [
    {
      title: 'Importance',
      content: 'We firmly believe in the value and importance of an environment where all AWS community members feel welcome and safe. This Code of Conduct explains the behavior we expect from AWS community members interacting at AWS events and programs, and across AWS blogs, online forums, and social media platforms. The purpose of AWS events, programs, blogs, online forums, and social media platforms is to foster technical and professional education and encourage community discussion.',
    },
    {
      title: 'Behavior',
      items: [
        'You will behave in a way that facilitates a safe and supportive environment for all AWS event and program participants, and across AWS blogs, online forums, and social media platforms.',
        'You will not engage in disruptive speech or behavior or otherwise interfere with other individuals\' participation in AWS events and programs, and across AWS blogs, online forums, and social media platforms.',
        'You will not interfere with the operation of AWS events, programs, blogs, online forums, and social media platforms.',
        'You will not attempt to receive benefits that you are not entitled to at AWS events and programs, and across AWS blogs, online forums, and social media platforms.',
        'You will not engage in any form of harassing, offensive, discriminatory, or threatening speech or behavior, including but not limited to relating to race, gender, gender identity and expression, national origin, religion, disability, marital status, age, sexual orientation, military or veteran status, or other protected category.',
        'You will comply with the instructions of AWS event and program staff, and AWS blog, online forum, and social media platform moderators.',
        'You will comply with all applicable laws and, in the context of AWS events, all of our event-specific requirements (including all health and safety requirements) and, in the context of AWS programs, all of our program-specific requirements.',
      ],
    },
    {
      title: 'Scope',
      content: 'We expect all AWS community members (including but not limited to attendees, vendors, sponsors, speakers, volunteers, moderators, and AWS employees) to uphold the principles of this Code of Conduct. In the context of AWS events, this Code of Conduct covers the main event and all related events (social or otherwise). In the context of AWS programs, this Code of Conduct covers the main program and all related activities. AWS employees must continue to abide by all company policies at all times.',
    },
    {
      title: 'Consequences',
      content: 'If we believe you breached this Code of Conduct, we may prohibit you from attending future AWS events and programs and interacting across AWS blogs, online forums, and social media platforms, and we may remove any content you created in violation of this Code of Conduct. Additionally, if we believe that you breached this Code of Conduct in the context of an AWS event or program, we may require you to leave the AWS event or program. If we require you to leave an AWS event, you will not be eligible to receive a refund of any fees paid to us related to the event. All determinations are at our sole discretion. We will involve law enforcement if we deem appropriate.',
    },
  ];

  return (
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center p-4"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/75 backdrop-blur-md" onClick={onClose} />

      {/* Modal Card */}
      <div
        className="relative w-full max-w-2xl max-h-[85vh] flex flex-col rounded-3xl overflow-hidden shadow-2xl"
        style={{
          background: 'linear-gradient(160deg, #0f0520 0%, #0a0a0f 100%)',
          border: '1px solid rgba(139,92,246,0.25)',
          boxShadow: '0 0 80px rgba(109,40,217,0.25)',
        }}
      >
        {/* Top accent line */}
        <div className="h-[2px] flex-shrink-0"
          style={{ background: 'linear-gradient(90deg, #6d28d9, #a855f7, #c084fc, #a855f7, #6d28d9)' }} />

        {/* Header */}
        <div className="flex items-start justify-between px-7 py-5 border-b border-white/5 flex-shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xl flex-shrink-0"
              style={{ background: 'rgba(139,92,246,0.15)', border: '1px solid rgba(139,92,246,0.30)' }}>
              📋
            </div>
            <div>
              <div className="text-white font-black text-lg leading-tight">Code of Conduct</div>
              <div className="text-purple-400 text-[10px] font-bold tracking-widest uppercase mt-0.5">
                AWS Student Builder Group · Last Updated: April 07, 2023
              </div>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-xl flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/8 transition-all duration-200 flex-shrink-0 ml-4"
            style={{ border: '1px solid rgba(255,255,255,0.08)' }}
          >✕</button>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto px-7 py-6 space-y-6">
          {sections.map((section, i) => (
            <div key={i}>
              <div className="flex items-center gap-2 mb-3">
                <div className="w-1 h-5 rounded-full" style={{ background: 'linear-gradient(180deg, #a855f7, #6d28d9)' }} />
                <h3 className="text-white font-black text-base">{section.title}</h3>
              </div>

              {section.content && (
                <p className="text-gray-400 text-sm leading-relaxed pl-3">{section.content}</p>
              )}

              {section.items && (
                <div className="space-y-2.5 pl-3">
                  {section.items.map((item, j) => (
                    <div key={j} className="flex items-start gap-3">
                      <span className="flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-black mt-0.5"
                        style={{ background: 'rgba(139,92,246,0.15)', border: '1px solid rgba(139,92,246,0.25)', color: '#a855f7' }}>
                        {j + 1}
                      </span>
                      <p className="text-gray-400 text-sm leading-relaxed">{item}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}

          {/* Contact Us Section */}
          <div className="p-5 rounded-2xl" style={{ background: 'rgba(139,92,246,0.08)', border: '1px solid rgba(139,92,246,0.18)' }}>
            <div className="text-white font-black text-sm mb-2">Contact Us</div>
            <p className="text-gray-300 text-xs leading-relaxed mb-3">
              If you witness or are subjected to inappropriate behavior at an AWS event or program, or on an AWS blog, discussion forum, or social media platform, please promptly contact AWS at:
            </p>
            <div className="flex flex-col gap-1.5">
              <a href="mailto:aws-events-security-concerns@amazon.com"
                className="text-purple-400 text-xs font-bold hover:text-purple-300 transition-colors inline-flex items-center gap-1.5">
                📧 aws-events-security-concerns@amazon.com
              </a>
              {eventData.email && (
                <a href={`mailto:${eventData.email}`}
                  className="text-purple-400 text-xs font-semibold hover:text-purple-300 transition-colors inline-flex items-center gap-1.5">
                  📧 {eventData.email} (Local Organizer)
                </a>
              )}
            </div>
          </div>
        </div>

        {/* Footer actions */}
        <div className="px-7 py-4 border-t border-white/5 flex-shrink-0 flex items-center justify-between">
          <span className="text-gray-600 text-xs">AWS Student Builder Group SMVEC</span>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-white text-xs font-bold transition-all duration-200 hover:scale-105"
            style={{ background: 'linear-gradient(135deg, #6d28d9, #7c3aed)' }}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
