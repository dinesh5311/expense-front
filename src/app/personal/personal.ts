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
