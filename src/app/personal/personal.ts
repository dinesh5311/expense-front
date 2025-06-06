import { Component, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-personal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './personal.html',
  styleUrls: ['./personal.scss']
})
export class Personal implements AfterViewInit {
  showReason = false;

  timelineItems = [
    {
      img: 'assets/img/pic1.jpeg',
      title: 'Our First Date',
      desc: 'Where it all began. I knew from this moment that you were someone special.'
    },
    {
      img: 'assets/img/pic2.jpeg',
      title: 'Our First Trip',
      desc: 'Remember the laughter, the views, and that time we got lost? Best adventure ever.'
    },
    {
      img: 'assets/img/pic3.jpeg',
      title: 'Simple Moments',
      desc: 'Cooking together, watching movies... they mean the world to me.'
    },
    {
      img: 'assets/img/pic4.jpeg',
      title: 'Celebrating Together',
      desc: 'Marking milestones and being each other\'s biggest cheerleader. So proud of us.'
    }
  ];

  reasons = [
    '...because mujhe puchuu ke saath rehna accha lgta h.',
    '...puchuu ke pass bachha bnna acha lgta h.',
    '...because puchuu ki baatein sunna accha lgta h.',
    '...puchuuu ki cutuu harktein acchi lgti h .',
    '...pchuuu ke liye kuch bhi karna accha lgta h.',
    '...puchuu ke saath khana banana accha lgta h.',
    '...puchuu se har baat share karna accha lgta h.',
  ];

  ngAfterViewInit() {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });

    document.querySelectorAll('.timeline-item').forEach(item => observer.observe(item));
  }

  showReasons() {
    this.showReason = true;
  }
}
