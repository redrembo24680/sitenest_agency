'use client';

import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import Image from 'next/image';
import { MemberAvatar } from '@/components/MemberAvatar';
import { TEAM_MEMBERS } from '@/lib/data';
import type { TeamMember } from '@/lib/data';
import { useLanguage } from '@/lib/i18n/LanguageContext';

export default function Team() {
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);
  const { t } = useLanguage();

  useEffect(() => {
    if (selectedMember) {
      setTimeout(() => {
        const textElement = document.querySelector('.modal-right h2');
        if (textElement) {
          textElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      }, 100);
    }
  }, [selectedMember]);

  return (
    <div className="page-fade-enter">
      <section className="team-hero">
        <div className="container">
          <span className="section-subtitle">{t.team.subtitle}</span>
          <h1>{t.team.title} <span>{t.team.titleHighlight}</span></h1>
          <p>{t.team.desc}</p>
        </div>
      </section>

      <section className="container">
        <div className="team-grid">
          {TEAM_MEMBERS.map((member, idx) => (
            <div 
              className="team-card" 
              key={idx}
              onClick={() => setSelectedMember(member)}
            >
              <div className="team-card-inner">
                <div className="team-img-wrapper">
                  {member.image ? (
                    <Image src={member.image} alt={member.name} className="team-member-img" width={256} height={256} />
                  ) : (
                    <MemberAvatar colorClass={member.id} devType={member.avatarId} />
                  )}
                </div>
                <div className="team-card-info">
                  <div>
                    <div className="team-name">{member.name}</div>
                    <div className="team-role">{member.role}</div>
                  </div>
                  <div className="team-mini-skills">
                    {member.miniSkills.map((s, i) => (
                      <span className="team-mini-skill" key={i}>{s}</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* TEAM MEMBER MODAL DETAIL POPUP */}
      {selectedMember && (
        <div 
          className="team-details-modal active"
          onClick={() => setSelectedMember(null)}
          role="dialog"
          aria-modal="true"
          aria-label={selectedMember.name}
        >
          <div className="glass-card modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" type="button" onClick={() => setSelectedMember(null)}>
              <X />
            </button>
            <div className="modal-body-grid">
              <div className="modal-left">
                {selectedMember.image ? (
                  <Image src={selectedMember.image} alt={selectedMember.name} className="team-member-img-full" width={512} height={512} />
                ) : (
                  <MemberAvatar colorClass={selectedMember.id} devType={selectedMember.avatarId} />
                )}
              </div>
              <div className="modal-right">
                <h2>{selectedMember.name}</h2>
                <div className="modal-role">{selectedMember.role}</div>
                <p className="modal-bio">{selectedMember.bio}</p>
                
                <div className="modal-skills-section">
                  <h4>{t.team.skills}</h4>
                  <div className="skills-bars">
                    {selectedMember.skills.map((skill, sIdx) => (
                      <div className="skill-bar-wrapper" key={sIdx}>
                        <div className="skill-bar-header">
                          <span>{skill.name}</span>
                          <span>{skill.level}%</span>
                        </div>
                        <div className="skill-bar-bg">
                          <div className="skill-bar-fill" style={{ width: `${skill.level}%` }}></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
